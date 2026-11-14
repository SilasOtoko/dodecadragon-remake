// Hand-ported from the original scripts/achievements.js.
//
// The original decides whether an achievement can be earned by checking that its box exists on the
// page. showAchievements(level) rebuilds those boxes from achievementDisplayUnlocks[level]; this port
// records that level instead and answers the same question from data.
import Decimal from '../vendor/break_eternity.js';
import { achievementDisplayUnlocks, achievementRequirements, achievementResources } from './constants';
import type { Engine } from './engine';

/** Equivalent of rebuilding the achievement boxes for an unlock level. */
export function showAchievements(g: Engine, level: number): void {
  g.rt.achievementDisplayLevel = level;
}

/**
 * Whether box "ach{row}x{k}" exists, exactly as the original builds them: categories with nothing
 * visible are skipped before rows are numbered (no data has such gaps today, but this keeps it exact).
 */
export function achievementBoxExists(g: Engine, row: number, k: number): boolean {
  const level = g.rt.achievementDisplayLevel ?? 0;
  const counts: readonly number[] = achievementDisplayUnlocks[level] ?? achievementDisplayUnlocks[achievementDisplayUnlocks.length - 1];
  const visible = counts.filter((n) => n > 0);
  return row < visible.length && k < visible[row];
}

export function checkAchievements(g: Engine): void {
  const game = g.state as any;
  for (let i = 0; i < Object.keys(achievementResources).length; i++) {
    if (game.unlockedAchievements[i] > 11) continue; // stars were never finished in the original
    let loops = 0;
    if (!achievementBoxExists(g, i, game.unlockedAchievements[i])) continue;
    while (loops < 10 && achievementRequirements[i][game.unlockedAchievements[i]] !== undefined
      && new Decimal(game[achievementResources[i].internalName]).gte(achievementRequirements[i][game.unlockedAchievements[i]])) {
      if (!achievementBoxExists(g, i, game.unlockedAchievements[i])) break;
      game.unlockedAchievements[i] += 1;
      achievementBoxOpen(g, i, game.unlockedAchievements[i] - 1);
      processAchievementRewards(g);
      loops++;
    }
  }
}

/** The original only refreshed the page here; rewards are checks spread through the game code. */
export function processAchievementRewards(_g: Engine): void {}

/** The original showed a popup. The engine reports it so the UI can show its own. */
export function achievementBoxOpen(g: Engine, category: number, index: number): void {
  g.emit({ type: 'achievement', category, index });
}

/**
 * Starts the "new achievements" flash on the Achievements tab. The original cleared the flag when
 * the player opened that tab (see Engine.setTab).
 */
export function achievementTabFlash(g: Engine): void {
  const game = g.state as any;
  if (game.achievementFlashActive === true) return;
  game.achievementFlashActive = true;
  // The original's flash loop (`while (game.currentTab !== 3)`) ends at once if the tab is open.
  if (game.currentTab === 3) game.achievementFlashActive = false;
}
