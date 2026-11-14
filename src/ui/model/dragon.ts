// The dragon screen, from the original's Dragon panel (script.js loadGame/updateSmall, dragon.js).
import { romanNumerals } from '../../content/text';
import Decimal from '../../vendor/break_eternity.js';
import type { State } from './types';

/** What the original shows for each dragon stage: article, title, picture and description. */
export const DRAGON_STAGES = [
  { article: 'a', title: 'Young dragon', img: 'img/iconDragon1.png', info: 'Your wild young dragon produces fire for you. It enjoys playing around on your gold stash.' },
  { article: 'an', title: 'Adult dragon', img: 'img/iconDragon2.png', info: 'Your large dragon friend inspires awe and fear, and spews fire for you.' },
  { article: 'an', title: 'Elder dragon', img: 'img/iconDragon3.png', info: 'Your strong and wise dragon friend rests upon your mountain of gold, and defends it with inferno-like breath.' },
  { article: 'a', title: 'Dark dragon', img: 'img/iconDragon4.png', info: 'Your menacing dark dragon calls upon the power of the void itself to defend your empire.' },
  { article: 'a', title: 'Light dragon', img: 'img/iconDragon5.png', info: "Your heavenly light dragon focuses the power of the gods themselves to protect your people from harm. It can also fire lightning out of its claws, because it's cool like that." },
  { article: 'a', title: 'Machine dragon', img: 'img/iconDragon6.png', info: 'Despite being filled with immense eldrich technology spiralling inwards forever, a million billion tiny cogs quietly ticking away, your dragon feels like merely a cog itself. Perhaps... it is part of a much larger machine.' },
  { article: 'a', title: 'Holy dragon', img: 'img/iconDragon7.png', info: 'Your dragon channels boundless energy through itself, a being of near-infinite strength. One even the gods fear. How did we get here?' },
  { article: 'a', title: 'Multidimensional dragon', img: 'img/iconDragon8.png', info: 'Your dragon can view countless universes at once and channel all of their combined power.' },
  { article: 'a', title: 'Plague dragon', img: 'img/iconDragon9.png', info: 'Dripping with the most dangerous substance in the omniverse, your dragon is completely unkillable.' },
  { article: 'a', title: 'Death dragon', img: 'img/iconDragon10.png', info: 'Your dragon embodies death itself. It seems you have killed Death and taken his place as the taker of souls.' },
  { article: 'a', title: 'Finality dragon', img: 'img/iconDragon11.png', info: 'Your dragon is now composed of the essence of the omniverse itself. It is physically impossible to become any stronger. Unless...?' },
  { article: 'a', title: 'DodecaDragon', img: 'img/iconDragon12.png', info: '' },
];

/** Ageing steps: upgradeDragon(n) takes the dragon from stage n to n+1. Text from the original buttons. */
const AGEING = [
  { n: 1, title: 'Age your dragon into an adult', effect: 'Multiplies fire gain by 100', cost: '2.5e6' },
  { n: 2, title: 'Age your dragon into an elder', effect: 'Multiplies fire gain by 100', cost: '1e12' },
  { n: 3, title: 'Corrupt your dragon with the power of darkness', effect: 'Multiplies fire gain by 10,000', cost: '1e25' },
  { n: 4, title: 'Infuse your dragon with the power of light', effect: 'Multiplies fire gain by 10,000,000', cost: '1e150' },
];

export function dragonView(s: State) {
  const stage = DRAGON_STAGES[Math.min(s.dragonStage, DRAGON_STAGES.length) - 1];
  // original: the first ageing button appears with fire upgrades (unlock 2); each later one replaces
  // the previous as the dragon grows. Steps beyond light dragon come with later eras.
  const step = s.unlocks >= 2 ? AGEING.find((a) => a.n === s.dragonStage) : undefined;
  return {
    numeral: romanNumerals[s.dragonStage - 1],
    ...stage,
    fireGoldMultiplier: s.fireGoldMultiplier as Decimal,
    unlockFire: s.unlocks === 1 ? { press: 'buyFireUpgrades()', title: 'Unlock fire upgrades', cost: new Decimal(5000) } : null,
    ageing: step ? { press: `upgradeDragon(${step.n})`, title: step.title, effect: step.effect, cost: new Decimal(step.cost) } : null,
  };
}
