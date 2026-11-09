import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Parity tests run the original game in jsdom and do long synchronous runs; separate
    // processes keep the test runner responsive.
    pool: 'forks',
    testTimeout: 300_000,
  },
})
