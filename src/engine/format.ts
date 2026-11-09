// Number formatting, ported from format() in the original scripts/script.js. Output must match
// the original character for character (see format.test.ts), including its quirks:
// - values near a whole number at layer 1+ are rounded up first (floating-point clean-up)
// - numbers from 1e9 show as "1.23e45"; exponents from 1e4 drop the mantissa ("e12,345")
// - from eeee10 it switches to "F" (tetration) notation, without a minus sign
import Decimal, { type DecimalSource } from '../vendor/break_eternity.js';

const E = (x: DecimalSource) => new Decimal(x);

/**
 * @param value the number
 * @param acc decimal places for small numbers (the original's `acc`, default 2)
 * @param max powers of ten before switching to scientific notation (default 9)
 */
export function format(value: DecimalSource, acc = 2, max = 9): string {
  let ex = E(value);
  const neg = ex.lt(0) ? '-' : '';
  if (ex.mag === Infinity) return neg + 'Infinity';
  if (Number.isNaN(ex.mag)) return neg + 'NaN';
  if (ex.layer > 0 && ex.mag % 1 > 0.9999) ex.mag = Math.ceil(ex.mag);
  if (ex.lt(0)) ex = ex.mul(-1);
  if (ex.eq(0)) return ex.toFixed(acc);
  const e = ex.log10().floor();
  if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
    const e2 = ex.log10().ceil();
    const m = ex.div(e2.eq(-1) ? E(0.1) : E(10).pow(e2));
    const be = e2.mul(-1).max(1).log10().gte(9);
    return neg + (be ? '' : m.toFixed(2)) + 'e' + format(e2, 0, max);
  }
  if (e.lt(max)) {
    const a = Math.max(Math.min(acc - e.toNumber(), acc), 0);
    return neg + (a > 0 ? ex.toFixed(a) : ex.toFixed(a).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  }
  if (ex.gte('eeee10')) {
    const slog = ex.slog();
    return (slog.gte(1e9) ? '' : E(10).pow(slog.sub(slog.floor())).toFixed(4)) + 'F' + format(slog.floor(), 0);
  }
  const m = ex.div(E(10).pow(e));
  const be = e.gte(10000);
  return neg + (be ? '' : m.toFixed(2)) + 'e' + format(e, 0, max);
}
