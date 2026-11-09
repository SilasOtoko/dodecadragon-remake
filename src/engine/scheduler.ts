// Deterministic timers: the engine runs on this in the app, and tests use it to drive the original too.
// A deterministic stand-in for browser timers, shared by the original-game harness and the port,
// so both run their loops at exactly the same simulated times and in the same order.

interface Job { name: string; ms: number; next: number; seq: number; fn: () => void }

export class Scheduler {
  now: number;
  private jobs: Job[] = [];
  private seq = 0;

  constructor(start: number) { this.now = start; }

  /** Like setInterval: first run after `ms`, then every `ms`. Ties run in registration order. */
  every(name: string, ms: number, fn: () => void): number {
    this.jobs.push({ name, ms, next: this.now + ms, seq: this.seq++, fn });
    return this.seq;
  }

  advance(ms: number): void {
    const end = this.now + ms;
    for (;;) {
      const due = this.jobs.filter((j) => j.next <= end).sort((a, b) => a.next - b.next || a.seq - b.seq)[0];
      if (!due) break;
      this.now = due.next;
      due.next += due.ms;
      due.fn();
    }
    this.now = end;
  }
}

/** Small seeded PRNG so runs that use Math.random are reproducible. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
