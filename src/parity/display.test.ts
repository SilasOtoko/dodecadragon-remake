// Display parity for the first era: the new interface's rules for which buttons show, which are
// disabled and what numbers they display must match what the original page shows, for the same
// state. The original runs in jsdom with its real page; the port's views come from src/ui/model.
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { bootOriginal, type OriginalGame } from './originalGame';
import { Scheduler, mulberry32 } from '../engine/scheduler';
import { Engine } from '../engine/engine';
import { format } from '../engine/format';
import Decimal from '../vendor/break_eternity.js';
import { minerView } from '../ui/model/hoard';
import { fireView } from '../ui/model/fire';
import { alchemyView } from '../ui/model/alchemy';
import { magicView } from '../ui/model/magic';
import { dragonView } from '../ui/model/dragon';
import { diffState } from './diffState';
import { nextPress } from './actions';
import { parseCall } from '../engine/registry';

const SAVES = path.resolve(__dirname, '../../reference/saves');
const START = 1_700_000_000_000;
// First-era saves: through the start of uranium (later eras get their own screens and checks).
const files = fs.readdirSync(SAVES).filter((n) => /^0[1-6]-.*\.json$/.test(n)).sort();

function boot(save: Record<string, unknown> | undefined) {
  const o = bootOriginal({ save, seed: 3, startTime: START });
  const scheduler = new Scheduler(START);
  const engine = new Engine({ now: () => scheduler.now, random: mulberry32(3) });
  engine.boot(save);
  engine.attach(scheduler);
  return { o, engine, scheduler };
}

/** What the original page shows for an element: visible (inline display chain) and disabled. */
function pageState(el: Element | undefined) {
  if (!el) return { exists: false, visible: false, disabled: false };
  let visible = true;
  for (let n: Element | null = el; n && n.tagName !== 'BODY'; n = n.parentElement) if ((n as HTMLElement).style.display === 'none') visible = false;
  return { exists: true, visible, disabled: Boolean((el as HTMLButtonElement).disabled) };
}
const byClass = (o: OriginalGame, cls: string) => [...o.window.document.getElementsByClassName(cls)] as Element[];
const byId = (o: OriginalGame, id: string) => o.window.document.getElementById(id) as Element | null;
const text = (o: OriginalGame, id: string) => byId(o, id)?.textContent ?? '';

function compare(o: OriginalGame, engine: Engine, when: string) {
  const s = engine.state;
  const problems: string[] = [];
  const same = (what: string, ours: unknown, theirs: unknown) => { if (ours !== theirs) problems.push(`${what}: ours ${JSON.stringify(ours)}, original ${JSON.stringify(theirs)}`); };

  // gold screen
  same('miner disabled', minerView(s).disabled, pageState(byId(o, 'buyMinerButton')!).disabled);
  same('miner cost', format(s.minerCost, 0), text(o, 'minerCost'));
  same('auto-hire shown', minerView(s).showAuto, pageState(byId(o, 'minerAutoBuyMaxButton')!).visible);

  // dragon
  if (s.unlocks >= 1) {
    const d = dragonView(s);
    same('dragon title', d.title, text(o, 'dragonTitle').replace(/^You have an?/, '').trim());
    same('dragon image', d.img, byId(o, 'dragonImg')!.getAttribute('src'));
    same('fire gold multiplier', format(d.fireGoldMultiplier, 2), text(o, 'fireGoldMultiplier'));
    const ageButtons = byClass(o, 'upgradeDragonButton');
    const shownAge = ageButtons.findIndex((b) => pageState(b).visible);
    same('ageing step shown', d.ageing ? Number(/upgradeDragon\((\d+)\)/.exec(d.ageing.press)![1]) - 1 : -1, shownAge);
  }

  // fire
  if (s.unlocks >= 2) {
    const f = fireView(s);
    const buttons = byClass(o, 'fireUpgrade');
    buttons.forEach((b, i) => {
      const view = f.upgrades.find((u) => u.key === `fire${i + 1}`);
      const page = pageState(b);
      same(`fire ${i + 1} shown`, Boolean(view), page.visible);
      if (view && page.visible) {
        same(`fire ${i + 1} disabled`, view.disabled, page.disabled);
        if (i === 0 && s.magicUpgradesBought[13]) {
          // Known display bug in the original: after loading, it shows fire upgrade 1 without magic
          // upgrade 14's boost until the next purchase, though production uses the boost
          // (updateSmall: 3.5^(bought^0.7)). We show the value the game actually uses.
          same('fire 1 effect (boosted)', view.effect, `Currently ×${format(new Decimal(3.5).pow(s.fireUpgrade1Bought.pow(0.7)), 2)}`);
        } else {
          same(`fire ${i + 1} effect`, view.effect, `Currently ×${text(o, `fireUpgrade${i + 1}Effect`)}`);
        }
        same(`fire ${i + 1} cost`, format(view.cost!.amount, 0), text(o, `fireUpgrade${i + 1}Cost`));
      }
    });
    same('fire buy max shown', Boolean(f.upgrades[0]?.buyMax), pageState(byClass(o, 'fireBuyMaxButton')[0]).visible);
    same('fire max all shown', f.showMaxAll, pageState(byId(o, 'fireMaxAllButton')!).visible);
    same('fire auto shown', f.showAuto, pageState(byId(o, 'fireAutoMaxAllButton')!).visible);
  }

  // alchemy
  if (s.unlocks >= 3) {
    const a = alchemyView(engine);
    same('platinum to get', format(a.toGet, 0), text(o, 'platinumToGet'));
    same('extra platinum per second', format(a.extraPerSecond, 0), text(o, 'extraPlatinumPerSecond'));
    same('convert disabled', a.convertDisabled, pageState(byId(o, 'platinumConvertButton')!).disabled);
    byClass(o, 'platinumUpgrade').forEach((b, i) => {
      const view = a.upgrades.find((u) => u.key === `platinum${i + 1}`);
      const page = pageState(b);
      same(`platinum ${i + 1} shown`, Boolean(view), page.visible);
      if (view && page.visible) same(`platinum ${i + 1} disabled`, view.disabled, page.disabled);
    });
    same('platinum 6 effect', a.upgrades[5].effect, `Currently ×${text(o, 'platinumUpgrade6Effect')}`);
    const p7 = a.upgrades.find((u) => u.key === 'platinum7');
    if (p7) {
      same('platinum 7 effect', p7.effect, `Currently ×${text(o, 'platinumUpgrade7Effect')}`);
      same('platinum 7 max', String(p7.count!.max), text(o, 'platinumUpgrade7Max'));
    }
    same('platinum max all shown', a.showMaxAll, pageState(byId(o, 'platinumMaxAllButton')!).visible);
  }

  // magic
  if (s.unlocks >= 4) {
    const m = magicView(engine);
    same('magic to get', format(m.toGet, 0), text(o, 'magicToGet'));
    same('magic effect', format(m.effect, 2), text(o, 'magicEffect'));
    same('softcapped', m.softcapped, text(o, 'magicEffectCap') !== '');
    same('hardcapped', m.hardcapped, text(o, 'magicCap') !== '');
    same('next magic', m.nextAt ? `Next magic at ${format(m.nextAt, 0)} gold` : '', text(o, 'nextMagic'));
    byClass(o, 'magicUpgrade').forEach((b, i) => {
      const view = m.upgrades.find((u) => u.key === `magic${i + 1}`);
      const page = pageState(b);
      same(`magic ${i + 1} shown`, Boolean(view), page.visible);
      if (view && page.visible) {
        same(`magic ${i + 1} disabled`, view.disabled, page.disabled);
        const effectId = `magicUpgrade${i + 1}Effect`;
        if (view.effect) same(`magic ${i + 1} effect`, view.effect, `Currently ×${text(o, effectId)}`);
      }
    });
    same('more magic upgrades offered', Boolean(m.moreUpgrades), pageState(byId(o, 'moreMagicUpgradesButton')!).visible);
    same('magic buy max shown', m.showBuyMax, pageState(byId(o, 'magicUpgradeBuyMaxButton')!).visible);
  }

  expect(problems, `${when}:\n  ${problems.join('\n  ')}`).toEqual([]);
}

async function run(save: Record<string, unknown> | undefined, label: string) {
  const { o, engine, scheduler } = boot(save);
  for (let i = 0; i < 6; i++) {
    o.advance(1000); scheduler.advance(1000);
    // the views are only meaningful if the states agree (the port parity tests cover that)
    expect(diffState(o.game, engine.state)).toEqual([]);
    compare(o, engine, `${label} after ${i + 1} s`);
  }
  // then button presses a player could make, comparing after each
  const pick = mulberry32(label.length * 31);
  const pressed = new Set<string>();
  for (let i = 0; i < 120; i++) {
    const call = nextPress(o, pressed, pick);
    if (!call) break;
    o.get(call); o.call('updateSmall');
    const { fn, args } = parseCall(call);
    engine.press(fn, ...args);
    if (i % 4 === 0) { o.advance(500); scheduler.advance(500); }
    expect(diffState(o.game, engine.state)).toEqual([]);
    compare(o, engine, `${label} after pressing ${call} (#${i})`);
  }
  o.close();
}

describe('first-era display matches the original page', () => {
  it('new game', () => run(undefined, 'new game'));
  it.each(files)('%s', (file) => run(JSON.parse(fs.readFileSync(path.join(SAVES, file), 'utf8')), file));
});
