// Lists the fields that differ between two game states, for readable parity failures.
export function diffState(expected: unknown, actual: unknown, limit = 8): string[] {
  const A = JSON.parse(JSON.stringify(expected)) as Record<string, unknown>;
  const B = JSON.parse(JSON.stringify(actual)) as Record<string, unknown>;
  const keys = [...new Set([...Object.keys(A), ...Object.keys(B)])];
  const show = (v: unknown) => { const s = JSON.stringify(v); return s && s.length > 90 ? s.slice(0, 87) + '...' : String(s); };
  return keys.filter((k) => JSON.stringify(A[k]) !== JSON.stringify(B[k])).slice(0, limit)
    .map((k) => `${k}: expected ${show(A[k])}, got ${show(B[k])}`);
}
