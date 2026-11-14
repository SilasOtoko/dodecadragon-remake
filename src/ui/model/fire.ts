// Fire upgrades, from the original's Fire upgrades panel (script.js updateSmall, fire.js).
import Decimal from '../../vendor/break_eternity.js';
import { format } from '../../engine/format';
import type { State, UpgradeView } from './types';

const E = (x: Decimal | number | string) => new Decimal(x);

const FIRE_UPGRADES: { n: number; name: string; effect: (s: State) => Decimal }[] = [
  { n: 1, name: 'Increase fire production',
    effect: (s) => s.magicUpgradesBought[13] ? E(3.5).pow(s.fireUpgrade1Bought.pow(0.7)) : E(2).pow(s.fireUpgrade1Bought.pow(0.6)) },
  { n: 2, name: 'Increase fire effect',
    effect: (s) => E(s.darkMagicUpgradesBought[5] ? 5 : s.magicUpgradesBought[8] ? 1.6 : 1.25).pow(s.fireUpgrade2Bought.pow(0.8)) },
  { n: 3, name: 'Increase gold/click',
    effect: (s) => s.fireUpgrade3Bought.pow(s.magicUpgradesBought[8] ? 12 : 2.6).mul(4).add(1) },
  { n: 4, name: 'Miners increase gold/second',
    effect: (s) => s.platinumUpgradesBought[8] > 0
      ? s.fireUpgrade4Bought.pow(s.miners.pow(0.3)).pow(s.platinumUpgradesBought[8] / 4).add(1)
      : s.fireUpgrade4Bought.pow(1.5).mul(s.miners).div(50).add(1) },
  { n: 5, name: 'Gold increases fire/second',
    effect: (s) => s.fireUpgrade5Bought.pow(1.5).mul(s.gold.add(1).log10()).div(5).add(1) },
  { n: 6, name: 'Increase platinum gain',
    effect: (s) => E(3).pow(s.fireUpgrade6Bought.pow(0.6)) },
];

export function fireView(s: State) {
  const upgrades: UpgradeView[] = FIRE_UPGRADES
    // original: upgrade 6 appears once platinum upgrade 3 is bought
    .filter((u) => u.n < 6 || s.platinumUpgradesBought[2] === 1)
    .map((u) => {
      const cost: Decimal = s[`fireUpgrade${u.n}Cost`];
      return {
        key: `fire${u.n}`,
        name: u.name,
        effect: `Currently ×${format(u.effect(s), 2)}`,
        count: { bought: format(s[`fireUpgrade${u.n}Bought`], 0) },
        cost: { amount: cost, resource: 'fire' },
        // original: disabled unless affordable and the cost is below e1e9
        disabled: !(s.fire.gte(cost) && cost.lt('e1e9')),
        allowed: () => { const c: Decimal = s[`fireUpgrade${u.n}Cost`]; return s.fire.gte(c) && c.lt('e1e9'); },
        short: !s.fire.gte(cost),
        press: `buyFireUpgrade(${u.n})`,
        // original: per-upgrade buy max appears at magic achievement tier 1
        buyMax: s.unlockedAchievements[3] > 0 ? `fireBuyMax(${u.n})` : undefined,
      };
    });
  return {
    upgrades,
    showMaxAll: s.unlockedAchievements[3] > 1,
    showAuto: s.unlockedAchievements[6] > 2,
    autoOn: Boolean(s.fireAutoMaxAll),
  };
}
