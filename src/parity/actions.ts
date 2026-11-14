// Choosing which of the original's buttons to press in parity tests.
import fs from 'node:fs';
import path from 'node:path';
import type { OriginalGame } from './originalGame';

/** Handlers that only save, load, change the view or play an easter egg, never gameplay. */
const NOT_GAMEPLAY = new Set(['save', 'exportGame', 'importGame', 'hardReset', 'changeTab', 'posSet',
  'achievementBoxClose', 'changeBackgroundPattern',
  'dragonClicky', // Ctrl-click art swap; a plain click looks up the player's IP via db-ip.com
]);
const isGameplay = (call: string) => !NOT_GAMEPLAY.has(call.replace(/\(.*$/, ''));

/** Every gameplay button call in the original page, e.g. "buyFireUpgrade(3)". */
export function allButtonCalls(): string[] {
  const html = fs.readFileSync(path.resolve(__dirname, '../../reference/original/index.html'), 'utf8');
  return [...new Set([...html.matchAll(/onclick="([^"]+)"/g)].map((m) => m[1].trim().replace(/;$/, '')))].filter(isGameplay);
}

/**
 * Picks the next button to press: only buttons a player could press right now in the original,
 * preferring ones this run hasn't pressed yet. Returns null if nothing is pressable.
 */
export function nextPress(original: OriginalGame, pressed: Set<string>, random: () => number): string | null {
  const options = [...new Set(original.clickable().filter(isGameplay))];
  if (!options.length) return null;
  const fresh = options.filter((c) => !pressed.has(c));
  const pool = fresh.length ? fresh : options;
  const call = pool[Math.floor(random() * pool.length)];
  pressed.add(call);
  return call;
}
