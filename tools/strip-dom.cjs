// Produces reference/stripped/*.js: the original game scripts with every statement that only
// updates the page removed, so the game logic is easier to read and port. Statements that READ
// the page to make a game decision are kept and listed in reference/stripped/DOM-READS.md.
//
// usage: node tools/strip-dom.cjs reference/original/scripts reference/stripped
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const [, , srcDir, outDir] = process.argv;
const FILES = ['script.js', 'gold.js', 'dragon.js', 'fire.js', 'alchemy.js', 'magic.js', 'magicChallenges.js',
  'sigils.js', 'knowledge.js', 'blood.js', 'holyPolyhedrons.js', 'planets.js', 'plague.js', 'essence.js',
  'nuclearPasta.js', 'achievements.js', 'constants.js'];
// Page globals besides `document`.
// (achievementBox/achievementRow are not here: they are the template the kept achievement functions clone.)
const DOM_ROOTS = new Set(['document', 'window', 'navigator', 'achieveTab', 'inputField']);
// Functions that only touch the page or input.
// Kept verbatim: the achievement boxes they create on the page decide which achievements can be
// earned (checkAchievements skips any achievement whose box doesn't exist).
const KEEP_VERBATIM = new Set(['showAchievements', 'showAchievement', 'achievementTabFlash']); // the last sets game.achievementFlashActive (saved)
const DISPLAY_FUNCS = new Set(['panToNewUnlock', 'generateHotkeyText', 'render',
  'resetPressedKeys', 'achievementPopup', 'alert']);

const rootName = (node) => {
  while (node) {
    if (t.isIdentifier(node)) return node.name;
    if (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) node = node.object;
    else if (t.isCallExpression(node)) node = node.callee;
    else return null;
  }
  return null;
};
const mentionsDom = (p) => {
  let found = false;
  p.traverse({ Identifier(ip) { if (DOM_ROOTS.has(ip.node.name) && !ip.parentPath.isMemberExpression({ property: ip.node, computed: false })) found = true; } });
  if (DOM_ROOTS.has(p.node?.name)) found = true;
  return found;
};

const reads = [];
let removed = 0;

fs.mkdirSync(outDir, { recursive: true });
for (const file of FILES) {
  const src = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const ast = parser.parse(src, { sourceType: 'script', errorRecovery: true });
  const lines = src.split('\n');
  traverse(ast, {
    FunctionDeclaration(p) { if (KEEP_VERBATIM.has(p.node.id.name)) p.skip(); },
    ExpressionStatement(p) {
      const e = p.node.expression;
      // DOM writes: x.y.z = ...  rooted at document; document.foo(...)/el.classList.add(...) calls
      const target = t.isAssignmentExpression(e) ? e.left : t.isCallExpression(e) ? e.callee : t.isUpdateExpression(e) ? e.argument : null;
      const root = target && rootName(target);
      // `window.foo = ...` defines a game global (mobileCheck, isDevVersion), so it stays.
      const definesGlobal = t.isAssignmentExpression(e) && root === 'window' && t.isMemberExpression(e.left) && t.isIdentifier(e.left.object, { name: 'window' });
      const isDomWrite = root && DOM_ROOTS.has(root) && !definesGlobal;
      const isDisplayCall = t.isCallExpression(e) && DISPLAY_FUNCS.has(rootName(e.callee));
      const isAlert = t.isAssignmentExpression(e) && t.isIdentifier(e.left, { name: 'alertString' });
      if (isDomWrite || isDisplayCall || isAlert) { p.remove(); removed++; return; }
      if (mentionsDom(p.get('expression'))) {
        const line = p.node.loc.start.line;
        reads.push(`| \`${file}\` | ${line} | \`${lines[line - 1].trim().slice(0, 140).replace(/\|/g, '\\|')}\` |`);
      }
    },
    VariableDeclarator(p) {
      if (p.node.init && mentionsDom(p.get('init'))) {
        const decl = p.parentPath;
        // Pure element lookups (let el = document.getElementById(...)) are display-only.
        if (t.isCallExpression(p.node.init) && rootName(p.node.init) === 'document' && decl.node.declarations.length === 1) { decl.remove(); removed++; return; }
        const line = p.node.loc.start.line;
        reads.push(`| \`${file}\` | ${line} | \`${lines[line - 1].trim().slice(0, 140).replace(/\|/g, '\\|')}\` |`);
      }
    },
  });
  // Tidy: drop if/else branches left empty, then ifs with nothing left at all.
  let changed = true;
  while (changed) {
    changed = false;
    traverse(ast, {
      IfStatement(p) {
        const empty = (n) => !n || (t.isBlockStatement(n) && n.body.length === 0) || t.isEmptyStatement(n);
        if (p.node.alternate && empty(p.node.alternate)) { p.node.alternate = null; changed = true; }
        if (empty(p.node.consequent) && !p.node.alternate) { p.remove(); changed = true; }
      },
      ForStatement(p) { if (t.isBlockStatement(p.node.body) && p.node.body.body.length === 0) { p.remove(); changed = true; } },
    });
  }
  const header = `// STRIPPED COPY of reference/original/scripts/${file}: page updates removed by tools/strip-dom.cjs.\n// For reading while porting only. Never edit; regenerate instead.\n`;
  fs.writeFileSync(path.join(outDir, file), header + generate(ast, { retainLines: false, comments: true }).code + '\n');
}
fs.writeFileSync(path.join(outDir, 'DOM-READS.md'), `# Page reads in game logic\n\nStatements in the original that read the page (form inputs, element state) while doing game logic. The port must replace each one with state or a function argument.\n\n| File | Line | Statement |\n|---|---|---|\n${reads.join('\n')}\n`);
console.log(`removed ${removed} page-update statements; ${reads.length} page reads listed`);
