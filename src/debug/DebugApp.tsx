// Debug page: the new engine running live, with the original's buttons grouped by the original's
// panels. A development tool for checking the engine and for reference while designing the real UI.
// Not the remake's interface.
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import Decimal from '../vendor/break_eternity.js';
import { Engine, realTimers } from '../engine/engine';
import { parseCall } from '../engine/registry';
import { format } from '../engine/format';
import layout from './layout.json';
import './debug.css';

const SAVE_KEY = 'dodecaRemakeDebugSave';

type LabelPart = { text: string } | { field: string; index?: number; fallback: string };
interface Panel { index: number; title: string; buttons: { call: string; label: LabelPart[]; hiddenAtStart?: boolean }[] }

/** Unlock level at which each original panel appears (docs/unlock-order.md). */
const PANEL_UNLOCK: Record<number, number> = {
  0: 0, 1: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 4, 8: 5, 9: 7, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 16: 14,
  19: 15, 21: 16, 22: 17, 23: 18, 24: 20, 25: 21, 26: 22, 28: 23, 29: 24, 30: 24, 31: 25, 32: 25, 33: 26,
  34: 27, 35: 28, 36: 28, 37: 29, 38: 30, 39: 31, 40: 32, 41: 33, 42: 33, 43: 34, 44: 35, 45: 36, 46: 37,
};
/**
 * One-time unlock buttons and the unlock each grants. The original shows each only while it is the
 * next unlock; pressing one early or twice moves the unlock counter out of sequence and breaks the save.
 */
const ONE_SHOT: Record<string, number> = {
  unlockDragon: 1, buyFireUpgrades: 2, unlockAlchemy: 3, unlockMagic: 4, unlockMoreMagicUpgrades: 6,
  morePUupgrades: 8, unlockDarkMagicUpgrades: 9, unlockBlood: 18, moreDarkMagicUpgrades: 19,
  unlockVoidMagicUpgrades: 27, unlockPlanets: 29, unlockEssences: 33, unlockDeathEssence: 34,
  unlockNuclearPasta: 35, unlockFinalityEssence: 36, unlockFinalityCubes: 37,
  bigFinishCheck: 38, // the ending, offered once every unlock is done
};
/** [label, field, per-second field, unlock level] */
const RESOURCES: [string, string, string | null, number][] = [
  ['Gold', 'gold', 'goldPerSecond', 0], ['Fire', 'fire', 'firePerSecond', 1], ['Platinum', 'platinum', null, 3],
  ['Magic', 'magic', null, 4], ['Magifolds', 'magifolds', null, 5], ['Uranium', 'uranium', null, 7],
  ['Cyan sigils', 'cyanSigils', 'cyanSigilPowerPerSecond', 10], ['Blue sigils', 'blueSigils', 'blueSigilPowerPerSecond', 11],
  ['Indigo sigils', 'indigoSigils', 'indigoSigilPowerPerSecond', 12], ['Violet sigils', 'violetSigils', 'violetSigilPowerPerSecond', 13],
  ['Pink sigils', 'pinkSigils', 'pinkSigilPowerPerSecond', 14], ['Knowledge', 'knowledge', null, 15], ['Tomes', 'tomes', null, 16],
  ['Blue fire', 'blueFire', 'blueFirePerSecond', 17], ['Blood', 'blood', 'bloodPerSecond', 18], ['Plutonium', 'plutonium', null, 20],
  ['Red sigils', 'redSigils', 'redSigilPowerPerSecond', 21], ['Orange sigils', 'orangeSigils', 'orangeSigilPowerPerSecond', 22],
  ['Yellow sigils', 'yellowSigils', 'yellowSigilPowerPerSecond', 23], ['Holy tetrahedrons', 'holyTetrahedrons', null, 24],
  ['Holy octahedrons', 'holyOctahedrons', null, 25], ['Holy fire', 'holyFire', 'holyFirePerSecond', 26],
  ['Holy dodecahedrons', 'holyDodecahedrons', null, 28], ['Planets', 'planets', null, 29], ['Superclusters', 'superclusters', null, 29],
  ['Hypergods defeated', 'hypergodsDefeated', null, 30], ['Cosmic plague', 'cosmicPlague', 'cosmicPlaguePerSecond', 31],
  ['Spores', 'spores', null, 31], ['Oganesson', 'oganesson', 'oganessonPerSecond', 32],
  ['Light essence', 'lightEssence', 'lightEssencePerSecond', 33], ['Dark essence', 'darkEssence', 'darkEssencePerSecond', 33],
  ['Death essence', 'deathEssence', 'deathEssencePerSecond', 34], ['Nuclear pasta', 'nuclearPasta', null, 35],
  ['Finality essence', 'finalityEssence', 'finalityEssencePerSecond', 36], ['Finality cubes', 'finalityCubes', null, 37],
];

const show = (v: unknown): string => {
  if (v instanceof Decimal) return format(v);
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toFixed(3);
  if (Array.isArray(v)) return '[' + v.map(show).join(', ') + ']';
  return String(v);
};

function readSave(): Record<string, unknown> | null {
  try { const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export default function DebugApp() {
  const engineRef = useRef<Engine | null>(null);
  if (!engineRef.current) {
    const engine = new Engine({ confirm: (m) => window.confirm(m), alert: (m) => window.alert(m) });
    engine.boot(readSave());
    engineRef.current = engine;
  }
  const engine = engineRef.current;
  const [, redraw] = useReducer((n: number) => n + 1, 0);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [saveText, setSaveText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timers = realTimers();
    engine.attach(timers);
    timers.every('redraw', 200, redraw);
    timers.every('autosave', 5000, () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(engine.state)); } catch { /* storage full or blocked */ } });
    const off = engine.on((e) => setMessage(`Achievement earned: category ${e.category}, tier ${e.index + 1}`));
    return () => { timers.stop(); off(); };
  }, [engine]);

  const s = engine.state as Record<string, any>;
  const unlocks: number = s.unlocks;

  function press(call: string) {
    try {
      const { fn, args } = parseCall(call);
      engine.press(fn, ...args);
      setError('');
    } catch (e) {
      setError(`${call} failed: ${(e as Error).message}`);
    }
    redraw();
  }

  function panelVisible(p: Panel): boolean {
    if (p.buttons.length === 0) return false;
    if (p.index === 20) return s.unlockedAchievements[10] > 1; // sigil automation
    const at = PANEL_UNLOCK[p.index];
    return at !== undefined && unlocks >= at;
  }

  const panels = (layout as Panel[]).filter(panelVisible);
  const fields = useMemo(() => Object.keys(s).sort(), [s]);
  const shownFields = filter ? fields.filter((k) => k.toLowerCase().includes(filter.toLowerCase())) : [];

  return (
    <div className="dbg">
      <header className="dbg-head">
        <h1>DodecaDragons engine <span>debug</span></h1>
        <p>The ported engine running live with the original's buttons. Not the remake's interface. Unlock {unlocks} of 37.</p>
      </header>

      {error && <p className="dbg-error" role="alert">{error}</p>}
      {message && <p className="dbg-note" role="status">{message}</p>}

      <section className="dbg-resources" aria-label="Resources">
        {RESOURCES.filter(([, f, , at]) => unlocks >= at && f in s).map(([label, f, rate]) => (
          <div key={f}><dt>{label}</dt><dd>{show(s[f])}{rate && f !== 'fire' && s[rate] !== undefined ? <small> +{show(s[rate])}/s</small> : null}{f === 'fire' ? <small> +{show(s.firePerSecond)}/s</small> : null}</dd></div>
        ))}
      </section>

      <main className="dbg-panels">
        {panels.map((p) => (
          <section key={p.index} className="dbg-panel">
            <h2>{p.title} <span>box {p.index}</span></h2>
            <div className="dbg-buttons">
              {p.buttons.filter((b) => {
                const name = b.call.replace(/\(.*$/, '');
                return !(name in ONE_SHOT) || unlocks === ONE_SHOT[name] - 1;
              }).map((b) => (
                <button key={b.call} type="button" onClick={() => press(b.call)} className={b.hiddenAtStart ? 'later' : ''}
                  title={b.hiddenAtStart ? `${b.call}: hidden until something reveals it in the original` : b.call}>
                  {b.label.map((part, i) => 'text' in part
                    ? part.text.split('\n').map((line, j) => <span key={`${i}-${j}`}>{j > 0 && <br />}{line}</span>)
                    : <b key={i}>{show(part.index === undefined ? s[part.field] : s[part.field]?.[part.index])}</b>)}
                </button>
              ))}
            </div>
          </section>
        ))}
      </main>

      <section className="dbg-tools">
        <h2>Save</h2>
        <p className="dbg-small">Autosaves every 5 seconds in this browser. Save codes from the original game work here, and this page's codes work in the original.</p>
        <label htmlFor="saveText">Save code</label>
        <textarea id="saveText" value={saveText} onChange={(e) => setSaveText(e.target.value)} rows={3} />
        <div className="dbg-row">
          <button type="button" onClick={() => setSaveText(btoa(JSON.stringify(engine.state)))}>Export</button>
          <button type="button" onClick={() => {
            try { engine.boot(JSON.parse(atob(saveText.trim()))); setError(''); setMessage('Save loaded.'); }
            catch { setError("That isn't a DodecaDragons save code."); }
          }}>Import</button>
          <button type="button" onClick={() => {
            if (!window.confirm('Start a new game? This erases the debug save.')) return;
            try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ }
            engine.boot(null); setMessage('New game started.');
          }}>New game</button>
        </div>

        <h2>State</h2>
        <label htmlFor="stateFilter">Show fields containing</label>
        <input id="stateFilter" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="e.g. magic, cost, Bought" />
        {filter && (
          <dl className="dbg-state">
            {shownFields.map((k) => <div key={k}><dt>{k}</dt><dd>{show(s[k])}</dd></div>)}
            {!shownFields.length && <p className="dbg-small">No fields match.</p>}
          </dl>
        )}
      </section>
    </div>
  );
}
