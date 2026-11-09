// Generates src/debug/layout.json from the original index.html: every panel ("box", indexed the way
// the original's getElementsByClassName("box") counts them), its title, and its gameplay buttons with
// their labels. Label parts whose element id matches a save field (e.g. <a id="minerCost">) are
// marked so the debug page can show the live value; other filled-in values become "…".
// usage: node tools/gen-debug-layout.cjs reference/original
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const orig = process.argv[2];
const html = fs.readFileSync(path.join(orig, 'index.html'), 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
const { document } = new JSDOM(html).window;
const resetFields = JSON.parse(fs.readFileSync('tools/reset-fields.json', 'utf8'));
const fields = new Set(resetFields.map((f) => f.key));
// <a class="platinumUpgradesBought"> elements: the n-th one in the page shows entry n of that array.
const arrayFields = new Set(resetFields.filter((f) => f.t === 'array').map((f) => f.key));
const arrayIndex = new Map();
for (const name of arrayFields) [...document.getElementsByClassName(name)].forEach((el, i) => arrayIndex.set(el, { field: name, index: i }));
const NOT_GAMEPLAY = /^(save|exportGame|importGame|hardReset|changeTab|posSet|achievementBoxClose|changeBackgroundPattern|dragonClicky)\(/;
const clean = (s) => s.replace(/\s+/g, ' ');

function labelParts(button) {
  const parts = [];
  const walk = (node) => {
    for (const child of node.childNodes) {
      if (child.nodeType === 3) parts.push({ text: clean(child.textContent) });
      else if (child.nodeName === 'BR') parts.push({ text: '\n' });
      else if (child.id && fields.has(child.id)) parts.push({ field: child.id, fallback: clean(child.textContent) });
      else if (arrayIndex.has(child)) parts.push({ ...arrayIndex.get(child), fallback: clean(child.textContent) });
      // Other ids are numbers the original's page code filled in; their markup text is only a
      // starting value, so don't present it as live.
      else if (child.id) parts.push({ text: '…' });
      else walk(child);
    }
  };
  walk(button);
  // merge neighbouring text and trim around line breaks
  const merged = [];
  for (const p of parts) {
    const last = merged[merged.length - 1];
    if (p.text !== undefined && last && last.text !== undefined) last.text += p.text;
    else merged.push({ ...p });
  }
  const out = merged.map((p) => (p.text !== undefined ? { text: p.text.replace(/ *\n */g, '\n') } : p));
  if (out[0]?.text !== undefined) out[0].text = out[0].text.trimStart();
  const end = out[out.length - 1];
  if (end?.text !== undefined) end.text = end.text.trimEnd();
  return out.filter((p) => p.text === undefined || p.text.length);
}

const panels = [...document.getElementsByClassName('box')].map((box, index) => {
  const title = clean(box.querySelector('.title-bar-text')?.textContent ?? '').trim();
  const buttons = [...box.querySelectorAll('[onclick]')]
    .map((el) => ({ call: el.getAttribute('onclick').trim().replace(/;$/, ''), el }))
    .filter(({ call }) => !NOT_GAMEPLAY.test(call) && /^\w+\(.*\)$/.test(call))
    .map(({ call, el }) => {
      // Hidden when the page loads: the original reveals these later (an unlock or upgrade).
      let hiddenAtStart = false;
      for (let n = el; n && n !== box; n = n.parentElement) if (n.style?.display === 'none') hiddenAtStart = true;
      return { call, label: labelParts(el), ...(hiddenAtStart ? { hiddenAtStart } : {}) };
    });
  return { index, title, buttons };
});
fs.mkdirSync('src/debug', { recursive: true });
fs.writeFileSync('src/debug/layout.json', JSON.stringify(panels, null, 1));
console.log(panels.map((p) => `${p.index}:${p.title || '(untitled)'}[${p.buttons.length}]`).join('  '));
