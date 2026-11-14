// Mechanically translates the stripped original (reference/stripped) into TypeScript engine modules
// (src/engine/generated). Gameplay is unchanged by construction; parity tests prove it.
//
// What it rewrites, inside every ported function:
//   game                         -> the engine's state (`const game = g.state`)
//   a call to another game fn    -> the imported port, with the engine passed first: fn(g, ...)
//   undeclared globals (temps)   -> fields on g.rt, so their values persist between calls as before
//   Date.now() / Math.random()   -> g.now() / g.random()   (controllable clock and seed)
//   confirm() / alert()          -> g.confirm() / g.alert() (the UI decides how to ask)
//   document.getElementById(id).prop (form reads) -> g.input(id, prop)
//   setTimeout(...) and leftover <option> building -> dropped (display only)
//
// usage: node tools/port-engine.cjs reference/stripped src/engine/generated
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const [, , srcDir, outDir] = process.argv;
const FILES = ['script', 'gold', 'dragon', 'fire', 'alchemy', 'magic', 'magicChallenges', 'sigils', 'knowledge',
  'blood', 'holyPolyhedrons', 'planets', 'plague', 'essence', 'nuclearPasta', 'achievements'];

// Not translated: save/load plumbing, page-only helpers, and the achievement display functions,
// which are hand-ported in src/engine/achievements.ts (they decided gameplay via the page).
const EXCLUDE = new Set(['format', 'reset', 'hardReset', 'save', 'setAutoSave', 'exportGame', 'importGame', 'load',
  'changeTab', 'lerp', 'lerpColour', 'getSaveErrorCode', 'dragonClicky', 'timeStopStart', 'changeDragonName',
  'showAchievement', 'showAchievements', 'getHoveredAchievement', 'showAchievementInfo', 'checkAchievements',
  'processAchievementRewards', 'achievementBoxOpen', 'achievementBoxClose', 'promiseDelay', 'achievementTabFlash']);
// Hand-ported functions the generated code may call, and the module they live in.
const HAND_PORTED = { showAchievements: '../achievements', checkAchievements: '../achievements',
  achievementTabFlash: '../achievements', processAchievementRewards: '../achievements', achievementBoxOpen: '../achievements' };
const BUILTINS = new Set(['Decimal', 'Math', 'JSON', 'Number', 'Object', 'Array', 'String', 'Boolean', 'parseInt',
  'parseFloat', 'isNaN', 'isFinite', 'Infinity', 'NaN', 'undefined', 'console', 'Promise', 'format', 'confirm', 'alert', 'Date']);
// Variables that only ever held <option> elements for page dropdowns.
const OPTION_VARS = new Set(['newHellLayer', 'redSigilAutoOption', 'orangeSigilAutoOption', 'yellowSigilAutoOption']);
// Calls to the original's map/camera code (render.js), which isn't ported.
const DROP_CALLS = new Set(['panTo', 'populateTabPositions']);

const constNames = (file) => [...fs.readFileSync(file, 'utf8').matchAll(/^export const (\w+)/gm)].map((m) => m[1]);
const ENGINE_CONSTS = new Set(constNames('src/engine/constants.ts'));
const TEXT_CONSTS = new Set(constNames('src/content/text.ts'));

// Pass 1: which module each ported function lives in.
const asts = {};
const owner = {};
for (const f of FILES) {
  asts[f] = parser.parse(fs.readFileSync(path.join(srcDir, f + '.js'), 'utf8'), { errorRecovery: true });
  for (const n of asts[f].program.body) if (t.isFunctionDeclaration(n) && !EXCLUDE.has(n.id.name)) owner[n.id.name] = f;
}

const runtime = new Map(); // global name -> first place it's assigned
const problems = [];
fs.mkdirSync(outDir, { recursive: true });

for (const f of FILES) {
  const ast = asts[f];
  const usedFns = new Set(), usedEngineConsts = new Set(), usedTextConsts = new Set();
  let usesFormat = false;
  ast.program.body = ast.program.body.filter((n) => t.isFunctionDeclaration(n) && owner[n.id.name] === f);
  if (!ast.program.body.length) continue;

  traverse(ast, {
    FunctionDeclaration(p) {
      if (p.parentPath.isProgram()) {
        p.node.params.unshift(Object.assign(t.identifier('g'), { typeAnnotation: t.tsTypeAnnotation(t.tsTypeReference(t.identifier('Engine'))) }));
        p.get('body').unshiftContainer('body', t.variableDeclaration('const', [t.variableDeclarator(t.identifier('game'), t.memberExpression(t.identifier('g'), t.identifier('state')))]));
        // `arguments` would now include the engine; give the body the original's argument list.
        let usesArguments = false;
        p.traverse({ Identifier(ip) { if (ip.node.name === 'arguments' && ip.isReferencedIdentifier()) { ip.node.name = 'originalArguments'; usesArguments = true; } } });
        if (usesArguments) p.get('body').unshiftContainer('body', t.variableDeclaration('const', [t.variableDeclarator(t.identifier('originalArguments'),
          t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier('Array'), t.identifier('prototype')), t.identifier('slice')), t.identifier('call')), [t.identifier('arguments'), t.numericLiteral(1)]))]));
      }
    },
    ExpressionStatement(p) {
      const src = generate(p.node).code;
      if (src.startsWith('setTimeout(')) { p.remove(); return; }
      if (t.isCallExpression(p.node.expression) && t.isIdentifier(p.node.expression.callee) && DROP_CALLS.has(p.node.expression.callee.name)) { p.remove(); return; }
      // The autosave warning (reads localStorage and only shows a message) is the UI's job.
      if (/localStorage/.test(src)) { p.remove(); return; }
      const e = p.node.expression;
      const target = t.isAssignmentExpression(e) ? e.left : null;
      let root = target; while (root && t.isMemberExpression(root)) root = root.object;
      if (root && t.isIdentifier(root) && OPTION_VARS.has(root.name)) p.remove();
    },
    VariableDeclaration(p) {
      if (/localStorage/.test(generate(p.node).code)) p.remove();
    },
    MemberExpression: {
      exit(p) {
        const { object, property } = p.node;
        // document.getElementById("id").prop  ->  g.input("id", "prop")
        if (t.isCallExpression(object) && generate(object.callee).code === 'document.getElementById' && t.isStringLiteral(object.arguments[0]) && !p.node.computed) {
          p.replaceWith(t.callExpression(t.memberExpression(t.identifier('g'), t.identifier('input')), [object.arguments[0], t.stringLiteral(property.name)]));
        }
      },
    },
    CallExpression: {
      exit(p) {
        const callee = generate(p.node.callee).code;
        const swap = { 'Date.now': 'now', 'Math.random': 'random', confirm: 'confirm', alert: 'alert' }[callee];
        if (swap) p.node.callee = t.memberExpression(t.identifier('g'), t.identifier(swap));
      },
    },
    Identifier(p) {
      const name = p.node.name;
      if (p.parentPath.isTSTypeReference() || p.parentPath.isTSQualifiedName()) return;
      if (!p.isReferencedIdentifier() && !(p.parentPath.isAssignmentExpression({ left: p.node }) || p.parentPath.isUpdateExpression())) return;
      if (p.parentPath.isMemberExpression({ property: p.node, computed: false })) return;
      // Same-file functions are bindings too; a binding only counts as local if it isn't a top-level function.
      const binding = p.scope.getBinding(name);
      const isLocal = binding && !(binding.kind === 'hoisted' && binding.scope.path.isProgram());
      if (isLocal || name === 'g' || name === 'game' || name === 'arguments' || name === 'originalArguments') return;
      if (owner[name] || HAND_PORTED[name]) {
        if (p.parentPath.isCallExpression({ callee: p.node })) { p.parentPath.node.arguments.unshift(t.identifier('g')); usedFns.add(name); }
        else problems.push(`${f}: ${name} used as a value at line ${p.node.loc?.start.line}`);
        return;
      }
      if (ENGINE_CONSTS.has(name)) { usedEngineConsts.add(name); return; }
      if (TEXT_CONSTS.has(name)) { usedTextConsts.add(name); return; }
      if (name === 'format') { usesFormat = true; return; }
      if (BUILTINS.has(name)) return;
      if (name === 'document' || name === 'window' || name === 'localStorage') return; // reported after the rewrite
      if (!runtime.has(name)) runtime.set(name, `${f}.js:${p.node.loc?.start.line}`);
      p.replaceWith(t.memberExpression(t.memberExpression(t.identifier('g'), t.identifier('rt')), t.identifier(name)));
      p.skip();
    },
  });

  // export every function
  ast.program.body = ast.program.body.map((n) => {
    const e = t.exportNamedDeclaration(n);
    e.leadingComments = n.leadingComments; n.leadingComments = null; // keep comments above `export`
    return e;
  });
  const imports = [
    `import Decimal from '../../vendor/break_eternity.js';`,
    `import type { Engine } from '../engine';`,
    usesFormat ? `import { format } from '../format';` : '',
    usedEngineConsts.size ? `import { ${[...usedEngineConsts].sort().join(', ')} } from '../constants';` : '',
    usedTextConsts.size ? `import { ${[...usedTextConsts].sort().join(', ')} } from '../../content/text';` : '',
    ...Object.entries([...usedFns].reduce((acc, fn) => { const m = HAND_PORTED[fn] ?? (owner[fn] === f ? null : './' + owner[fn]); if (m) (acc[m] ??= []).push(fn); return acc; }, {}))
      .map(([m, fns]) => `import { ${fns.sort().join(', ')} } from '${m}';`),
  ].filter(Boolean);
  const header = `// GENERATED by tools/port-engine.cjs from reference/stripped/${f}.js. Do not edit by hand:\n// change the tool or the hand-written engine instead, then regenerate.\n// Type checking is off because this is the original JavaScript, translated line for line;\n// correctness is enforced by the parity tests against the original game.\n// @ts-nocheck\n`;
  const code = generate(ast, { comments: false }).code;
  for (const m of code.matchAll(/.*\b(document|window|localStorage)\b.*/g)) problems.push(`${f}: page access left: ${m[0].trim().slice(0, 110)}`);
  for (const m of code.matchAll(/g\.rt\.(\w+)\(/g)) problems.push(`${f}: calls unknown function ${m[1]}`);
  fs.writeFileSync(path.join(outDir, f + '.ts'), header + imports.join('\n') + '\n\n' + generate(ast, { comments: true }).code + '\n');
}

// Runtime: every global the original kept between calls.
const rtLines = [...runtime.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([n, where]) => `  ${n}?: any; // first used ${where}`);
fs.writeFileSync('src/engine/generated/runtime.ts', `// GENERATED by tools/port-engine.cjs. Globals the original game kept between calls (temporaries,\n// cached effects, loop counters). They live on the engine so values carry over exactly as before.\n\nexport interface Runtime {\n${rtLines.join('\n')}\n  [name: string]: any;\n}\n`);
console.log(`ported ${Object.keys(owner).length} functions; ${runtime.size} runtime globals`);
if (problems.length) { console.log('NEEDS ATTENTION:\n  ' + problems.join('\n  ')); process.exitCode = 1; }
