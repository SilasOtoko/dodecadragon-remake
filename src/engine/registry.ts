// Every ported game function by its original name, so a button's original onclick text
// (e.g. "buyFireUpgrade(3)") can be run against the engine.
import * as script from './generated/script';
import * as gold from './generated/gold';
import * as dragon from './generated/dragon';
import * as fire from './generated/fire';
import * as alchemy from './generated/alchemy';
import * as magic from './generated/magic';
import * as magicChallenges from './generated/magicChallenges';
import * as sigils from './generated/sigils';
import * as knowledge from './generated/knowledge';
import * as blood from './generated/blood';
import * as holyPolyhedrons from './generated/holyPolyhedrons';
import * as planets from './generated/planets';
import * as plague from './generated/plague';
import * as essence from './generated/essence';
import * as nuclearPasta from './generated/nuclearPasta';
import type { Engine } from './engine';

type GameFn = (g: Engine, ...args: any[]) => unknown;
export const gameFunctions: Record<string, GameFn> = Object.assign({}, script, gold, dragon, fire, alchemy, magic,
  magicChallenges, sigils, knowledge, blood, holyPolyhedrons, planets, plague, essence, nuclearPasta);

/** Parses "name(1, 'x')" into the function and its arguments. */
export function parseCall(call: string): { fn: GameFn; args: unknown[] } {
  const m = /^(\w+)\((.*)\)$/.exec(call.trim());
  if (!m || !gameFunctions[m[1]]) throw new Error(`Unknown game action: ${call}`);
  const args = m[2].trim() ? (new Function(`return [${m[2]}]`)() as unknown[]) : [];
  return { fn: gameFunctions[m[1]], args };
}
