// What a screen needs to draw an upgrade or action, worked out from the engine state using the
// original game's display code (which buttons show, what they say, when they're disabled).
import type Decimal from '../../vendor/break_eternity.js';
import type { Engine } from '../../engine/engine';

export type State = Engine['state'];

export interface Cost {
  amount: Decimal | number;
  /** Resource key, used for its icon and name (see resources.ts). */
  resource: string;
}

export interface UpgradeView {
  key: string;
  name: string;
  /** "Currently ×1.23" style line, already formatted. */
  effect?: string;
  /** Times bought and the most allowed, for repeatable upgrades. */
  count?: { bought: number | string; max?: number | string };
  cost?: Cost;
  /** Bought once and done. */
  owned?: boolean;
  /** The original's button is disabled: pressing is not allowed. */
  disabled: boolean;
  /** Re-checks `disabled` against the live state, for repeated presses between redraws. */
  allowed: () => boolean;
  /** Can't be afforded right now (shown, but pressing does nothing in the original either). */
  short?: boolean;
  press: string;
  /** A "Buy max" for this upgrade, when the original shows one. */
  buyMax?: string;
}
