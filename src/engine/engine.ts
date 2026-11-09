// The game engine: owns the state, runs the original's loops on schedule, and exposes every player
// action. The game logic itself is the line-for-line port in ./generated; this file replaces the
// parts of the original that depended on the browser page (start-up order, timers, form fields,
// pop-up confirmations).
import Decimal from '../vendor/break_eternity.js';
import { sigilColours, sigilResetterModes } from './constants';
import { sigilResetterModesFull } from '../content/text';
import { createInitialState, type GameState } from './state';
import type { Runtime } from './generated/runtime';
import { showAchievements } from './achievements';
import * as script from './generated/script';

export type EngineEvent =
  | { type: 'achievement'; category: number; index: number };

export interface EngineOptions {
  /** Clock in ms. Defaults to Date.now. */
  now?: () => number;
  /** Random numbers in [0, 1). Defaults to Math.random. */
  random?: () => number;
  /** Asks the player to confirm a reset. Defaults to "yes". */
  confirm?: (message: string) => boolean;
  /** Shows the player a message. */
  alert?: (message: string) => void;
}

/** Anything that can run a function every `ms` milliseconds: a test Scheduler or real timers. */
export interface Timers { every(name: string, ms: number, fn: () => void): unknown }

/** Browser timers, like the original's setInterval calls. Returns a function that stops them. */
export function realTimers(): Timers & { stop(): void } {
  const ids: ReturnType<typeof setInterval>[] = [];
  return {
    every: (_name, ms, fn) => ids.push(setInterval(fn, ms)),
    stop: () => ids.forEach((id) => clearInterval(id)),
  };
}

/** Form fields the original read from the page, keyed by element id, then property. */
export type Inputs = Record<string, Record<string, unknown>>;

export class Engine {
  /** The save data. Its fields and values match the original game exactly. */
  state: GameState & Record<string, any>;
  /** Globals the original kept between calls (see generated/runtime.ts). */
  rt: Runtime = {};
  /** Values the player has entered in form fields, overriding the defaults the original showed. */
  inputs: Inputs = {};
  private listeners: ((e: EngineEvent) => void)[] = [];
  private opts: Required<EngineOptions>;

  constructor(opts: EngineOptions = {}) {
    this.opts = {
      now: opts.now ?? Date.now,
      random: opts.random ?? Math.random,
      confirm: opts.confirm ?? (() => true),
      alert: opts.alert ?? (() => {}),
    };
    this.state = createInitialState(this.now()) as Engine['state'];
  }

  now(): number { return this.opts.now(); }
  random(): number { return this.opts.random(); }
  confirm(message: string): boolean { return this.opts.confirm(message); }
  alert(message: string): void { this.opts.alert(message); }

  on(listener: (e: EngineEvent) => void): () => void {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter((l) => l !== listener); };
  }
  emit(e: EngineEvent): void { for (const l of this.listeners) l(e); }

  /**
   * Starts the game the way the original page did: a fresh game, one recalculation while the
   * scripts load, then (on page load) a fresh game again with the save applied.
   */
  boot(save?: Record<string, unknown> | null): void {
    const g = this.rt;
    // script.js top level
    this.state = createInitialState(this.now()) as Engine['state'];
    g.isDevVersion = false;
    g.timeStopped = false;
    script.updateSmall(this);
    g.timeSinceLastUpdate = this.now();
    g.lastTimePlayedUp = this.now();
    g.bigFinishPoint = 0;
    // achievements.js top level
    showAchievements(this, 0);
    // window load
    this.state = createInitialState(this.now()) as Engine['state'];
    if (save != null) script.loadGame(this, structuredClone(save));
  }

  /**
   * Registers the original's loops (150 ms, 500 ms, 100 ms) in the original order, with a test
   * Scheduler or with real browser timers (see realTimers).
   */
  attach(scheduler: Timers): void {
    scheduler.every('updateSmall', 150, () => script.updateSmall(this));
    scheduler.every('updateLarge', 500, () => script.updateLarge(this));
    scheduler.every('timePlayedUp', 100, () => script.timePlayedUp(this));
  }

  /**
   * Runs a player action. Like the original page, every click also triggers a full recalculation
   * afterwards (`<body onclick="updateSmall()">`).
   */
  press<A extends unknown[]>(action: (g: Engine, ...args: A) => unknown, ...args: A): void {
    action(this, ...args);
    script.updateSmall(this);
  }

  /** Switches tab. Opening Achievements (3) stops the "new achievement" flash, as in the original. */
  setTab(tab: number): void {
    this.state.currentTab = tab;
    if (tab === 3) this.state.achievementFlashActive = false;
  }

  /**
   * Reads a form field the original took from the page. Unless the player has entered something
   * (this.inputs), returns what the original page would be showing, derived from the state.
   */
  input(id: string, prop: string): any {
    const override = this.inputs[id]?.[prop];
    if (override !== undefined) return override;
    const s = this.state;
    switch (`${id}.${prop}`) {
      case 'hellLayer.selectedIndex': return s.currentHellLayer - 1;
      case 'knowledgeLevelRange.value':
      case 'knowledgeLevelInput.value': return String(s.knowledgeTradeLevel.mag);
      case 'sigilResetterType.length': return this.sigilResetterOptionCount();
      case 'sigilResetterType.value': {
        const colour = sigilColours[s.sigilResetterType];
        return colour && s.sigilResetterType < this.sigilResetterOptionCount() ? colour[0].toUpperCase() + colour.slice(1) : '';
      }
      case 'sigilResetterMode.value': return sigilResetterModesFull[s.sigilResetterMode];
      case 'sigilResetterAmount.value': return s['sigilResetter' + sigilResetterModes[s.sigilResetterMode]].toString();
      case 'sigilResetterActive.checked': return s.sigilResetterActive;
      case 'sigilResetterCycle.checked': return s.sigilResetterCycle;
      case 'sigilResetterCycleMode.checked': return Boolean(s.sigilResetterCycleMode);
    }
    throw new Error(`No model for form field ${id}.${prop}`);
  }

  /** The sigil resetter's colour list: cyan to pink, plus red, orange and yellow once unlocked. */
  private sigilResetterOptionCount(): number {
    const u = this.state.unlocks;
    return 5 + (u >= 21 ? 1 : 0) + (u >= 22 ? 1 : 0) + (u >= 23 ? 1 : 0);
  }
}

export { Decimal };
