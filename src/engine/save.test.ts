// Parity test: loads every save-bank save with the ORIGINAL loadGame()/fixSaveVersion() source
// (evaluated from the reference checkout) and with our port, and requires identical results.
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import Decimal from '../vendor/break_eternity.js';
import { createInitialState, FIELD_COUNT } from './state';
import { exportSave, importSave, loadSave, serialize } from './save';

const ROOT = path.resolve(__dirname, '../..');
const ORIGINAL = path.join(ROOT, 'reference/original'); // MIT copy of DemoninCG/DodecaDragons v1.0.1
const SAVES = path.join(ROOT, 'reference/saves');
const NOW = 1_700_000_000_000;

const hasOriginal = fs.existsSync(path.join(ORIGINAL, 'scripts/script.js'));

/** Builds the original reset()+loadGame() data logic as a function, with page code stripped. */
function originalLoader() {
  const require = createRequire(import.meta.url);
  const OrigDecimal = require(path.join(ORIGINAL, 'scripts/break_eternity.js'));
  const src = fs.readFileSync(path.join(ORIGINAL, 'scripts/script.js'), 'utf8');
  const slice = (from: string, to: string) => { const a = src.indexOf(from); return src.slice(a, src.indexOf(to, a)); };
  const resetBody = slice('game = {', '\n  for (i=3;');
  const loadBody = slice('function loadGame(loadgame) {', 'if (shouldCheckVersion) fixSaveVersion(oldVersion);');
  const fixBody = slice('function fixSaveVersion(oldVersion) {', '\ntimeStopped = false');
  const code = `var game, i, j; ${fixBody}
    return function (loadgame) { ${resetBody};
      ${loadBody.replace('function loadGame(loadgame) {', '')}
      if (shouldCheckVersion) fixSaveVersion(oldVersion);
      return game; }`;
  return { load: new Function('Decimal', 'Date', code)(OrigDecimal, { now: () => NOW }), OrigDecimal };
}

const saveFiles = fs.readdirSync(SAVES).filter((n) => n.endsWith('.json')).sort();

describe('initial state', () => {
  it('has every field the original reset() declares', () => {
    expect(Object.keys(createInitialState(NOW))).toHaveLength(FIELD_COUNT);
  });
  it.runIf(hasOriginal)('matches the original reset() exactly', () => {
    const { load } = originalLoader();
    const orig = load({});
    // An empty save still runs the version fix (no lastMajorChangeVersion), which is a no-op on defaults.
    expect(JSON.parse(serialize(createInitialState(NOW) as never))).toEqual(JSON.parse(JSON.stringify({ ...orig, lastMajorChangeVersion: 3 })));
  });
});

describe.runIf(hasOriginal)('loading save-bank saves matches the original', () => {
  const { load } = originalLoader();
  it.each(saveFiles)('%s', (file) => {
    const data = JSON.parse(fs.readFileSync(path.join(SAVES, file), 'utf8'));
    // Key order differs (we group fields by system); loading matches keys by name, so compare values.
    const expected = JSON.parse(JSON.stringify(load(structuredClone(data))));
    const actual = JSON.parse(serialize(loadSave(structuredClone(data), NOW)));
    expect(actual).toEqual(expected);
  });
});

describe('export / import', () => {
  it.each(saveFiles)('imports the original export string for %s, and our export re-imports the same way the original would', (file) => {
    const exportString = fs.readFileSync(path.join(SAVES, file.replace('.json', '.txt')), 'utf8');
    const once = importSave(exportString, NOW);
    expect(once.gold).toBeInstanceOf(Decimal);
    const reExport = exportSave(once);
    const ours = JSON.parse(serialize(importSave(reExport, NOW)));
    if (hasOriginal) {
      // Not always identical to `once`: the original's v0.5 migration writes a 3-slot pink array
      // into a 4-slot default, so a second load gains a 4th slot. We match the original either way.
      const theirs = JSON.parse(JSON.stringify(originalLoader().load(JSON.parse(atob(reExport)))));
      expect(ours).toEqual(theirs);
    }
  });
});
