// Save, load, export and import, ported from the data parts of the original
// save() / loadGame() / fixSaveVersion() in scripts/script.js (v1.0.1).
// Everything that touched the page in the original is left to the UI layer.
import Decimal from '../vendor/break_eternity.js';
import { createInitialState, type SaveData } from './state';

export const SAVE_KEY = 'dodecaSave';
export const LAST_SAVED_KEY = 'dodecaLastSaved';
export const CURRENT_SAVE_VERSION = 3;

/**
 * Applies a parsed save onto a fresh game, exactly like the original loadGame():
 * - string values become Decimals (except dragonName)
 * - arrays are copied element by element into the default array, so they can grow
 *   (unlockedAchievements starts with 11 slots; late saves have 25)
 * - every other key, including legacy keys the game no longer declares, is copied as-is
 * - lastUpdate is set to now, so there is no offline progress
 */
export function loadSave(loaded: Record<string, unknown>, now: number = Date.now()): SaveData {
  const game = createInitialState(now) as SaveData;
  const raw = { ...loaded };
  const oldVersion = raw.lastMajorChangeVersion as number | undefined;
  const shouldCheckVersion = oldVersion === undefined || oldVersion < CURRENT_SAVE_VERSION;
  raw.lastMajorChangeVersion = CURRENT_SAVE_VERSION;

  for (const key of Object.keys(raw)) {
    const value = raw[key];
    if (value === 'undefined') continue; // original: loadgame[key] != "undefined"
    const target = (game as Record<string, unknown>)[key];
    if (typeof value === 'string' && key !== 'dragonName') {
      (game as Record<string, unknown>)[key] = new Decimal(value);
    } else if (Array.isArray(value) && target) {
      const arr = target as unknown[];
      value.forEach((el, j) => { arr[j] = typeof el === 'string' ? new Decimal(el) : el; });
    } else {
      (game as Record<string, unknown>)[key] = value;
    }
  }

  game.lastUpdate = now;
  if (shouldCheckVersion) fixSaveVersion(game, oldVersion);
  return game;
}

/** Migrations for saves from before v0.7.3. Same logic and order as the original. */
export function fixSaveVersion(game: SaveData, oldVersion: number | undefined): void {
  const g = game as Record<string, any>;
  if (oldVersion === undefined) {
    if (g.cyanSigilUpgrade1Bought) g.cyanSigilUpgradesBought = [g.cyanSigilUpgrade1Bought, g.cyanSigilUpgrade2Bought, g.cyanSigilUpgrade3Bought, g.cyanSigilUpgrade6Bought];
    if (g.blueSigilUpgrade1Bought) g.blueSigilUpgradesBought = [g.blueSigilUpgrade1Bought, g.blueSigilUpgrade2Bought, g.blueSigilUpgrade3Bought, g.blueSigilUpgrade6Bought];
    if (g.indigoSigilUpgrade1Bought) g.indigoSigilUpgradesBought = [g.indigoSigilUpgrade1Bought, g.indigoSigilUpgrade2Bought, g.indigoSigilUpgrade4Bought, g.indigoSigilUpgrade6Bought];
    if (g.violetSigilUpgrade1Bought) g.violetSigilUpgradesBought = [g.violetSigilUpgrade1Bought, g.violetSigilUpgrade2Bought, g.violetSigilUpgrade5Bought, g.violetSigilUpgrade6Bought];
    if (g.pinkSigilUpgrade3Bought || typeof g.pinkSigilUpgradesBought[0] === 'number') g.pinkSigilUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0)];
    for (const colour of ['cyan', 'blue', 'indigo', 'violet']) {
      for (let n = 1; n <= 6; n++) delete g[`${colour}SigilUpgrade${n}Bought`];
    }
    delete g.pinkSigilUpgrade3Bought;
    oldVersion = 0;
  }
  if (oldVersion < 2) {
    g.darkMagicUpgradesBought = g.pinkSigilUpgradesBought[1].gt(0)
      ? g.darkMagicUpgradesBought.slice(0, 10)
      : g.darkMagicUpgradesBought.slice(0, 8);
  }
  if (oldVersion < 3) {
    if (g.tomeUpgradesBought[11]) g.unlocks = 20;
    if (g.tomeUpgradesBought[12]) g.unlocks = 21;
  }
}

/** JSON as the original stores it in localStorage (Decimals serialize to strings). */
export function serialize(game: SaveData): string {
  return JSON.stringify(game);
}

/** The export string the original's Export button produces: base64 of the save JSON. */
export function exportSave(game: SaveData): string {
  return btoa(serialize(game));
}

/** Accepts an export string from the original game or this remake. Throws on bad input. */
export function importSave(text: string, now: number = Date.now()): SaveData {
  const parsed = JSON.parse(atob(text.trim()));
  if (!parsed || typeof parsed !== 'object') throw new Error('That save code is not valid.');
  return loadSave(parsed, now);
}
