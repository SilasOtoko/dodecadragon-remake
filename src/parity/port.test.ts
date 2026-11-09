// THE parity test: the original game and the port, side by side from the same save, on the same
// clock and random seed, pressing the same buttons. Every field of the state must match.
import { afterAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { bootOriginal } from './originalGame';
import { allButtonCalls, nextPress } from './actions';
import { diffState } from './diffState';
import { Scheduler, mulberry32 } from '../engine/scheduler';
import { Engine } from '../engine/engine';
import { parseCall } from '../engine/registry';

const SAVES = path.resolve(__dirname, '../../reference/saves');
const START = 1_700_000_000_000;
const saveFiles = fs.readdirSync(SAVES).filter((n) => n.endsWith('.json')).sort();
const everyCall = allButtonCalls();
const pressedAnywhere = new Set<string>();

function bootPort(save: Record<string, unknown> | undefined, seed: number) {
  const scheduler = new Scheduler(START);
  const engine = new Engine({ now: () => scheduler.now, random: mulberry32(seed) });
  engine.boot(save);
  engine.attach(scheduler);
  return { engine, scheduler };
}

function check(expected: unknown, actual: unknown, when: string) {
  const d = diffState(expected, actual);
  expect(d, `${when}:\n  ${d.join('\n  ')}`).toEqual([]);
}

/** Lets the test runner process its messages during long runs. */
const breathe = () => new Promise<void>((r) => setImmediate(r));

/** Runs an action on one side; returns the error message if it throws (the original can crash). */
function attempt(fn: () => unknown): string | null {
  try { fn(); return null; } catch (e) { return (e as Error).message; }
}

async function run(save: Record<string, unknown> | undefined, label: string, presses: number) {
  const o = bootOriginal({ save, seed: 7, startTime: START });
  const p = bootPort(save, 7);
  check(o.game, p.engine.state, `${label} after loading`);
  await breathe();
  for (let i = 0; i < 4; i++) {
    o.advance(5000); p.scheduler.advance(5000);
    check(o.game, p.engine.state, `${label} after ${(i + 1) * 5} s idle`);
    await breathe();
  }
  // Press buttons a player could press at each moment, preferring ones not pressed yet.
  const pick = mulberry32(label.length * 7919);
  const pressed = new Set<string>();
  for (let i = 0; i < presses; i++) {
    const call = nextPress(o, pressed, pick);
    if (!call) { o.advance(500); p.scheduler.advance(500); continue; }
    o.get(call); o.call('updateSmall'); // a click also runs <body onclick="updateSmall()">
    const { fn, args } = parseCall(call);
    p.engine.press(fn, ...args);
    if (i % 3 === 0) { o.advance(500); p.scheduler.advance(500); }
    check(o.game, p.engine.state, `${label} after press #${i} (${call})`);
    if (i % 20 === 0) await breathe();
  }
  pressed.forEach((c) => pressedAnywhere.add(c));
  o.close();
}

/**
 * Presses every button once, hidden ones included, from the save as loaded. Not a state a player
 * can reach, but the port is a line-for-line translation, so it must behave identically anyway:
 * same state afterwards, and a crash in the original must be the same crash in the port.
 */
async function everyButton(save: Record<string, unknown> | undefined, label: string) {
  const o = bootOriginal({ save, seed: 11, startTime: START });
  const p = bootPort(save, 11);
  for (const [i, call] of everyCall.entries()) {
    const theirs = attempt(() => { o.get(call); o.call('updateSmall'); });
    const { fn, args } = parseCall(call);
    const ours = attempt(() => p.engine.press(fn, ...args));
    expect(ours, `${label}: ${call} crash`).toBe(theirs);
    check(o.game, p.engine.state, `${label} after ${call} (hidden-button pass)`);
    if (i % 20 === 0) await breathe();
  }
  o.close();
}

describe('port matches the original', () => {
  const load = (file: string) => JSON.parse(fs.readFileSync(path.join(SAVES, file), 'utf8'));
  it('new game', () => run(undefined, 'new game', 400));
  it.each(saveFiles)('%s', (file) => run(load(file), file, 400));
  it('new game: every button, hidden ones included', () => everyButton(undefined, 'new game'));
  it.each(saveFiles)('%s: every button, hidden ones included', (file) => everyButton(load(file), file));
  afterAll(() => {
    const never = everyCall.filter((c) => !pressedAnywhere.has(c));
    console.log(`Buttons pressed while pressable: ${everyCall.length - never.length} of ${everyCall.length}. Only covered by the hidden-button pass: ${never.join(' ')}`);
  });
});
