// Alchemy I (platinum), from the original's Alchemy panel (script.js updateSmall, alchemy.js).
import Decimal from '../../vendor/break_eternity.js';
import { format } from '../../engine/format';
import type { Engine } from '../../engine/engine';
import type { State, UpgradeView } from './types';

interface PlatinumUpgrade { n: number; name: string; cost: number; max: (s: State) => number; effect?: (g: Engine) => Decimal; visible?: (s: State) => boolean }

const PLATINUM_UPGRADES: PlatinumUpgrade[] = [
  { n: 1, name: 'Gain 20% more gold/second', cost: 200, max: () => 20 },
  { n: 2, name: 'Gain 20% more fire/second', cost: 500, max: () => 20 },
  { n: 3, name: 'Unlock a new fire upgrade', cost: 750, max: () => 1 },
  { n: 4, name: 'Miner cost scales 5% slower', cost: 1500, max: () => 5 },
  { n: 5, name: 'Automatically gain platinum every second without resetting', cost: 2000, max: () => 1 },
  // effect is the engine's own value (a runtime global in the original)
  { n: 6, name: 'Platinum increases gold/second', cost: 15000, max: () => 4, effect: (g) => new Decimal(g.rt.platinumUpgrade6Effect ?? 1) },
  // original: shows once magic upgrade 8 is bought; the button disables at 10, or 20 with magic upgrade 11
  { n: 7, name: 'Increase magic effect', cost: 1e6, max: (s) => (s.magicUpgradesBought[10] ? 20 : 10),
    effect: (g) => new Decimal(1.5).pow(g.state.platinumUpgradesBought[6]), visible: (s) => Boolean(s.magicUpgradesBought[7]) },
  // original: 8 and 9 show from unlock 8 ("Gain more platinum and uranium upgrades")
  { n: 8, name: 'Double uranium gain', cost: 1e22, max: () => 5, visible: (s) => s.unlocks >= 8 },
  { n: 9, name: 'Fire upgrade 4 is boosted', cost: 1e30, max: () => 5, visible: (s) => s.unlocks >= 8 },
];

export function alchemyView(g: Engine) {
  const s = g.state;
  const upgrades: UpgradeView[] = PLATINUM_UPGRADES.filter((u) => !u.visible || u.visible(s)).map((u) => {
    const bought: number = s.platinumUpgradesBought[u.n - 1];
    const max = u.max(s);
    return {
      key: `platinum${u.n}`,
      name: u.name,
      effect: u.effect ? `Currently ×${format(u.effect(g), 2)}` : undefined,
      count: { bought, max },
      cost: { amount: u.cost, resource: 'platinum' },
      owned: max === 1 && bought >= 1,
      // original: disabled only when maxed; unaffordable presses just do nothing
      disabled: bought >= max,
      allowed: () => s.platinumUpgradesBought[u.n - 1] < u.max(s),
      short: !s.platinum.gte(u.cost),
      press: `buyPlatinumUpgrade(${u.n})`,
    };
  });
  return {
    platinum: s.platinum as Decimal,
    toGet: s.platinumToGet as Decimal,
    cooldown: s.platinumConvertCooldown as number,
    // original: disabled while the 3-second cooldown runs
    convertDisabled: s.platinumConvertCooldown > 0,
    // original: "+ Gain X extra platinum per second", always shown
    extraPerSecond: Decimal.max(s.bestPlatinumToGet.div(10), 2),
    upgrades,
    // original: Max all appears at gold achievement tier 5
    showMaxAll: s.unlockedAchievements[0] > 4,
  };
}
