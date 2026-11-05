// Evaluates the `game = {...}` literal from the original reset() and dumps fields as JSON.
const fs = require('fs');
const path = require('path');
const orig = process.argv[2];
const Decimal = require(path.resolve(orig, 'scripts/break_eternity.js'));
const src = fs.readFileSync(path.join(orig, 'scripts/script.js'), 'utf8');
const start = src.indexOf('game = {', src.indexOf('function reset()'));
let depth = 0, i = src.indexOf('{', start), end = -1;
for (; i < src.length; i++) { if (src[i] === '{') depth++; else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } } }
const literal = src.slice(src.indexOf('{', start), end + 1);
const game = new Function('Decimal', 'return (' + literal + ')')(Decimal);
// capture the comment on each field line, and the section comment above
const lines = literal.split('\n');
const comments = {}; let section = '';
for (const l of lines) {
  const sc = l.match(/^\s*\/\/(.*)$/); if (sc && !/Bought|Cost/.test(sc[1])) section = sc[1].trim();
  const m = l.match(/^\s*(\w+)\s*:/); if (m) { const c = l.match(/\/\/(.*)$/); comments[m[1]] = { note: c ? c[1].trim() : '', section }; }
}
const out = Object.entries(game).map(([k, v]) => {
  const desc = (x) => x instanceof Decimal ? { t: 'Decimal', v: x.toString() } : Array.isArray(x) ? { t: 'array', v: x.map(desc) } : { t: typeof x, v: x };
  return { key: k, ...desc(v), ...comments[k] };
});
process.stdout.write(JSON.stringify(out, null, 1));
