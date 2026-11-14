// Test-only: boots the unmodified original game (reference/original) in jsdom with a controlled
// clock, seeded randomness and captured timers, so its state can be compared with the port.
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { Scheduler, mulberry32 } from '../engine/scheduler';

const ORIGINAL = path.resolve(__dirname, '../../reference/original');
// Script order from the original index.html. jQuery is loaded there but never used.
const SCRIPTS = [
  'break_eternity.js', 'Mousetrap.js', 'constants.js', 'script.js', 'gold.js', 'dragon.js', 'fire.js',
  'alchemy.js', 'magic.js', 'magicChallenges.js', 'sigils.js', 'knowledge.js', 'blood.js',
  'holyPolyhedrons.js', 'planets.js', 'plague.js', 'essence.js', 'nuclearPasta.js', 'achievements.js',
  'hotkeys.js', 'render.js',
];
// Only the game-logic loops run. Rendering, fps and autosave intervals are ignored.
const GAME_LOOPS = new Set(['updateSmall', 'updateLarge', 'timePlayedUp']);

export interface OriginalGame {
  window: any;
  /** The original's live `game` object. */
  readonly game: any;
  /** Calls a global function of the original, e.g. call('buyMiner'). */
  call(name: string, ...args: unknown[]): unknown;
  /** Reads a global (including top-level const/let) of the original. */
  get(expr: string): any;
  /** Advances the clock, running the game loops exactly when they would fire. */
  advance(ms: number): void;
  readonly now: number;
  /** onclick calls of the buttons a player could press right now (visible and enabled). */
  clickable(): string[];
  close(): void;
}

export interface BootOptions {
  /** A save object (decoded JSON) to load, as the original's load() would from localStorage. */
  save?: Record<string, unknown>;
  startTime?: number;
  seed?: number;
  /** Load the page-update-stripped scripts (reference/stripped) instead of the originals. */
  stripped?: boolean;
}

export function bootOriginal(opts: BootOptions = {}): OriginalGame {
  const scheduler = new Scheduler(opts.startTime ?? 1_700_000_000_000);
  const random = mulberry32(opts.seed ?? 1);
  const html = fs.readFileSync(path.join(ORIGINAL, 'index.html'), 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  const dom = new JSDOM(html, {
    url: 'https://demonin.com/games/dodecaDragons/', // not a "dev version": skips the fps loop
    runScripts: 'dangerously',
    pretendToBeVisual: false,
    beforeParse(window: any) {
      window.Date.now = () => scheduler.now;
      window.Math.random = random;
      window.setInterval = (fn: () => void, ms: number) =>
        GAME_LOOPS.has(fn.name) ? scheduler.every(fn.name, ms, fn) : 0;
      window.setTimeout = () => 0; // only cosmetic delays use timeouts
      window.Audio = class { volume = 1; play() { return Promise.resolve(); } pause() {} };
      window.alert = () => {};
      window.confirm = () => true;
      window.HTMLCanvasElement.prototype.getContext = () => null;
      if (opts.save) window.localStorage.setItem('dodecaSave', JSON.stringify(opts.save));
    },
  });
  const { window } = dom;
  for (const name of SCRIPTS) {
    const el = window.document.createElement('script');
    const strippedPath = path.join(ORIGINAL, '../stripped', name);
    const file = opts.stripped && fs.existsSync(strippedPath) ? strippedPath : path.join(ORIGINAL, 'scripts', name);
    el.textContent = fs.readFileSync(file, 'utf8');
    window.document.body.appendChild(el);
  }
  const boot = window.document.createElement('script');
  boot.textContent = 'load()';
  window.document.body.appendChild(boot);

  return {
    window,
    get game() { return window.game; },
    call: (name, ...args) => window[name](...args),
    get: (expr) => window.eval(expr),
    advance: (ms) => scheduler.advance(ms),
    get now() { return scheduler.now; },
    clickable: () => clickableButtons(window),
    close: () => window.close(),
  };
}

// Selectors the original stylesheet hides (display: none) until the game shows them inline.
const CSS = fs.readFileSync(path.join(ORIGINAL, 'style.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const HIDDEN_BY_CSS = [...CSS.matchAll(/([^{}]+)\{([^}]*)\}/g)]
  .filter((m) => /(^|;)\s*display\s*:\s*none/.test(m[2])).map((m) => m[1].trim()).join(', ');

/**
 * The onclick calls of every button a player could press right now: shown (no hidden ancestor)
 * and not disabled. Follows the cascade the game relies on: an inline display wins, otherwise the
 * stylesheet's hiding rules apply. Only meaningful for the unstripped original, which keeps its
 * page up to date.
 */
function clickableButtons(window: any): string[] {
  const hidden = new Map<Element, boolean>();
  const isHidden = (el: Element | null): boolean => {
    if (!el || el === window.document.body) return false;
    const known = hidden.get(el);
    if (known !== undefined) return known;
    const inline = (el as HTMLElement).style?.display;
    const self = inline ? inline === 'none' : Boolean((el as HTMLElement).hidden) || el.matches(HIDDEN_BY_CSS);
    const result = self || isHidden(el.parentElement);
    hidden.set(el, result);
    return result;
  };
  const calls: string[] = [];
  for (const el of window.document.querySelectorAll('[onclick]')) {
    if (el === window.document.body || (el as HTMLButtonElement).disabled || isHidden(el)) continue;
    calls.push(el.getAttribute('onclick').trim().replace(/;$/, ''));
  }
  return calls;
}
