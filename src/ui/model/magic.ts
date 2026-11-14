// Magic and magic upgrades, from the original's Magic panels (script.js updateSmall, magic.js).
import Decimal from '../../vendor/break_eternity.js';
import { format } from '../../engine/format';
import { magicUpgradeCosts } from '../../engine/constants';
import { getNextMagicAt } from '../../engine/generated/magic';
import type { Engine } from '../../engine/engine';
import type { State, UpgradeView } from './types';

const MAGIC_UPGRADES: { name: string; effect?: (s: State) => Decimal }[] = [
  { name: 'Gold multiplies its own gain', effect: (s) => s.gold.add(1).log10().add(1) },
  { name: 'Increases magic gain by 50%' },
  { name: 'Multiply gold and fire gain by 55.5. Waow.' },
  { name: 'Magic multiplies its own gain', effect: (s) => s.magic.add(1).log2().mul(s.magicUpgradesBought[9] ? 4 : 1.5).add(1) },
  { name: 'Gold multiplies fire gain', effect: (s) => s.gold.add(1).log2().add(1) },
  { name: 'Miners increase gold/second', effect: (s) => s.miners.pow(s.magicUpgradesBought[9] ? 3 : 1.5).add(1) },
  { name: 'Double magic gain. Simple.' },
  { name: 'Unlock a new platinum upgrade (kept on magic reset)' },
  { name: 'Fire upgrades 2 and 3 are severely boosted' },
  { name: 'Magic upgrades 4 and 6 are boosted' },
  { name: 'Platinum upgrade 7 can be bought an extra 10 times' },
  { name: 'Unlock Magic Challenges' },
  { name: 'Challenge score gain is doubled' },
  { name: 'Fire upgrade 1 is boosted' },
  { name: "Challenge B1's effect is better" },
  { name: 'Magic effect is squared' },
  { name: 'Magifolds multiply score gain', effect: (s) => s.magifolds.log10().div(3) },
  { name: 'Triple magic gain again. Easy peasy.' },
  { name: 'Magifold effect is boosted from (x^4) to (x^6)' },
  { name: 'Unlock Uranium' },
];

export function magicView(g: Engine) {
  const s = g.state;
  const upgrades: UpgradeView[] = MAGIC_UPGRADES.map((u, i) => ({ u, i }))
    // original: upgrades 13–20 show from unlock 6 ("Unlock more magic upgrades")
    .filter(({ i }) => i < 12 || s.unlocks >= 6)
    .map(({ u, i }) => {
      const owned = s.magicUpgradesBought[i] === true;
      return {
        key: `magic${i + 1}`,
        name: u.name,
        effect: u.effect ? `Currently ×${format(u.effect(s), 2)}` : undefined,
        cost: { amount: magicUpgradeCosts[i], resource: 'magic' },
        owned,
        disabled: owned, // original: disabled once bought
        allowed: () => s.magicUpgradesBought[i] !== true,
        short: !s.magic.gte(magicUpgradeCosts[i]),
        press: `buyMagicUpgrade(${i + 1})`,
      };
    });
  const hardcap = g.rt.magicHardcap as Decimal | undefined;
  return {
    magic: s.magic as Decimal,
    toGet: s.magicToGet as Decimal,
    // original: shows "Next magic at X gold" until unlock 10
    nextAt: s.unlocks < 10 ? (getNextMagicAt(g) as Decimal) : null,
    effect: s.magicEffect as Decimal,
    // original labels: after the softcap (effect above e1000) and at the hardcap
    softcapped: s.magicEffect.gt('e1000'),
    hardcapped: Boolean(hardcap && s.magic.eq(hardcap)),
    upgrades,
    // original: offered after unlock 5, until bought (needs magic and magifolds)
    moreUpgrades: s.unlocks === 5 ? { press: 'unlockMoreMagicUpgrades()', magic: new Decimal(2e8), magifolds: new Decimal(150000) } : null,
    // original: Buy max appears at gold achievement tier 11
    showBuyMax: s.unlockedAchievements[0] > 10,
  };
}
