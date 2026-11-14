// The gold screen: gold, miners and the next unlock. From the original's DodecaDragons panel.
import Decimal from '../../vendor/break_eternity.js';
import { format } from '../../engine/format';
import type { State } from './types';

export function minerView(s: State) {
  return {
    cost: s.minerCost as Decimal,
    // original: buyMinerButton.disabled = gold < minerCost
    disabled: !s.gold.gte(s.minerCost),
    allowed: () => s.gold.gte(s.minerCost),
    // original: the auto-buy toggle appears at gold achievement tier 9
    showAuto: s.unlockedAchievements[0] > 8,
    autoOn: Boolean(s.minerAutoBuyMax),
  };
}

export interface NextUnlock {
  press: string;
  title: string;
  detail?: string;
  /** What it costs, for the progress bar: how far the player's amount is toward it. */
  need: { field: string; amount: Decimal; resource: string };
}

/**
 * One-time unlocks bought from the gold screen, in order. Each is offered only while it's the next
 * unlock, as in the original (pressing one early or twice moves the unlock counter out of order).
 */
const GOLD_UNLOCKS: { at: number; press: string; title: string; detail?: string; gold: string }[] = [
  { at: 0, press: 'unlockDragon()', title: 'Get a young dragon', gold: '200' },
  { at: 2, press: 'unlockAlchemy()', title: 'Unlock Alchemy', gold: '2e7' },
  { at: 3, press: 'unlockMagic()', title: 'Unlock Magic', gold: '1e15' },
];

export function nextGoldUnlock(s: State): NextUnlock | null {
  const u = GOLD_UNLOCKS.find((x) => x.at === s.unlocks);
  if (!u) return null;
  return { press: u.press, title: u.title, detail: u.detail, need: { field: 'gold', amount: new Decimal(u.gold), resource: 'gold' } };
}

/**
 * 0–1 progress toward an amount. A straight fraction up to a billion; beyond that a log scale,
 * since a straight bar toward e1000 would sit at 0% until the last moment.
 */
export function progress(have: Decimal, need: Decimal): number {
  if (have.gte(need)) return 1;
  if (need.lte(1e9)) return Math.max(0, have.div(need).toNumber());
  const h = have.add(1).log10().toNumber();
  const n = need.add(1).log10().toNumber();
  return n > 0 ? Math.max(0, Math.min(1, h / n)) : 1;
}

export const fmt = (v: Decimal | number, acc = 0) => format(v, acc);
