// The running game for the app: one engine, the original's loops on real timers, autosave in the
// original's format, and a React hook that redraws while the numbers tick.
import { useSyncExternalStore } from 'react';
import { Engine, realTimers, type EngineEvent } from '../engine/engine';
import { parseCall } from '../engine/registry';

// Same keys as the original, so behaviour matches (each site has its own storage anyway).
const SAVE_KEY = 'dodecaSave';
const LAST_SAVED_KEY = 'dodecaLastSaved';
const REDRAW_MS = 100;

function readSave(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeSave(): boolean {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(engine.state));
    localStorage.setItem(LAST_SAVED_KEY, String(Date.now()));
    return true;
  } catch {
    return false;
  }
}

export const engine = new Engine({
  confirm: (message) => window.confirm(message),
  alert: (message) => window.alert(message),
});
engine.boot(readSave());

let version = 0;
const listeners = new Set<() => void>();
const notify = () => {
  version++;
  listeners.forEach((l) => l());
};

const timers = realTimers();
engine.attach(timers);
timers.every('redraw', REDRAW_MS, notify);
timers.every('autosave', 5000, writeSave); // the original autosaves every 5 seconds

/** Re-renders the calling component as the game ticks. Returns the engine. */
export function useGame(): Engine {
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => version,
  );
  return engine;
}

/**
 * Runs a button's action by the original's call text, e.g. "buyFireUpgrade(3)", from a click.
 * The recalculation the original ran after every click comes from the page-wide listener below.
 */
export function act(call: string): void {
  const { fn, args } = parseCall(call);
  fn(engine, ...args);
}

/** Runs an action that isn't a click (a held button repeating): the action plus its recalculation. */
export function actRepeat(call: string): void {
  const { fn, args } = parseCall(call);
  engine.press(fn, ...args);
  notify();
}

// The original had <body onclick="updateSmall()">: every click anywhere, after any button's own
// action, recalculates the game. Bubbling to the document runs after React's handlers.
document.addEventListener('click', () => {
  engine.recalculate();
  notify();
});

/** Sets the dragon's name, as the original's name box did when changed. */
export function renameDragon(name: string): void {
  engine.state.dragonName = name;
  notify();
}

export function onGameEvent(listener: (e: EngineEvent) => void): () => void {
  return engine.on(listener);
}

/** Replaces the game with a save code (from the original or this remake). Throws on bad input. */
export function importCode(code: string): void {
  const data = JSON.parse(atob(code.trim()));
  if (!data || typeof data !== 'object') throw new Error('not a save');
  engine.boot(data);
  writeSave();
  notify();
}

export function exportCode(): string {
  return btoa(JSON.stringify(engine.state));
}

export function newGame(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* storage blocked */
  }
  engine.boot(null);
  notify();
}
