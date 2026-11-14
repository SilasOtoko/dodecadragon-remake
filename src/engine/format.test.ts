// Compares format() with the original's, evaluated from reference/original, over every number in
// the save bank plus edge cases, at each accuracy the game uses.
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import Decimal from '../vendor/break_eternity.js';
import { format } from './format';

const ROOT = path.resolve(__dirname, '../..');
const require = createRequire(import.meta.url);
const OrigDecimal = require(path.join(ROOT, 'reference/original/scripts/break_eternity.js'));
const src = fs.readFileSync(path.join(ROOT, 'reference/original/scripts/script.js'), 'utf8');
const start = src.indexOf('function format(ex, acc=2, max=9) {');
const body = src.slice(start, src.indexOf('\n}\n', start) + 2);
const originalFormat = new Function('Decimal', `var neg; ${body}; return format;`)(OrigDecimal);

const values: string[] = ['0', '1', '-1', '0.5', '0.004', '1e-5', '1e-15', '-2.5e-7', '999', '1000', '12345.678',
  '999999999', '1e9', '-1e12', '1.5e100', 'e9999', 'e10000', 'e123456', 'ee9', 'ee15', 'e1e9', 'eee10',
  'eeee10', 'eeeee10', '10^^20', '10^^1e10', '-ee20', 'NaN', 'Infinity', '-Infinity'];
const saves = path.join(ROOT, 'reference/saves');
for (const f of fs.readdirSync(saves).filter((n) => n.endsWith('.json'))) {
  const walk = (v: unknown) => { if (typeof v === 'string' && v !== 'Dragon') values.push(v); else if (Array.isArray(v)) v.forEach(walk); };
  Object.values(JSON.parse(fs.readFileSync(path.join(saves, f), 'utf8'))).forEach(walk);
}
const unique = [...new Set(values)];

describe('format matches the original', () => {
  it(`formats ${unique.length} values at each accuracy`, () => {
    let checked = 0;
    for (const v of unique) {
      for (const [acc, max] of [[2, 9], [0, 9], [1, 9], [3, 9], [2, 3]]) {
        expect(format(new Decimal(v), acc, max), `${v} acc=${acc} max=${max}`).toBe(originalFormat(new OrigDecimal(v), acc, max));
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(1000);
  });
});
