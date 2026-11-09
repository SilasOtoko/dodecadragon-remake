// Proves reference/stripped (the original minus page updates) plays identically to the original,
// so it is a safe source to port from: idle play, then random button presses, on every save.
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { bootOriginal } from './originalGame';
import { nextPress } from './actions';
import { mulberry32 } from '../engine/scheduler';

const SAVES = path.resolve(__dirname, '../../reference/saves');
const files = fs.readdirSync(SAVES).filter((n) => n.endsWith('.json')).sort();
const snapshot = (g: any) => JSON.stringify(g);

describe('stripped scripts match the original', () => {
  it.each(files)('%s', async (file) => {
    const save = JSON.parse(fs.readFileSync(path.join(SAVES, file), 'utf8'));
    const a = bootOriginal({ save, seed: 7 });
    const b = bootOriginal({ save, seed: 7, stripped: true });
    // idle play
    for (let i = 0; i < 4; i++) {
      a.advance(5000); b.advance(5000);
      await new Promise<void>((r) => setImmediate(r));
      expect(snapshot(b.game), `idle ${i}`).toBe(snapshot(a.game));
    }
    // random button presses, same sequence for both
    // buttons a player could press at each moment (the stripped copy has no page, so ask the original)
    const pick = mulberry32(file.length * 7919);
    const pressed = new Set<string>();
    for (let i = 0; i < 300; i++) {
      const call = nextPress(a, pressed, pick);
      if (!call) { a.advance(500); b.advance(500); continue; }
      a.get(call); b.get(call);
      if (i % 3 === 0) { a.advance(500); b.advance(500); }
      if (i % 20 === 0) await new Promise<void>((r) => setImmediate(r)); // let the test runner breathe
      if (i % 10 === 9) expect(snapshot(b.game), `presses up to #${i} (last: ${call})`).toBe(snapshot(a.game));
    }
    a.close(); b.close();
  });
});
