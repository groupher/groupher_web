/**
 * Runs Assets Hub's pure Node unit tests without loading Worker-only modules.
 *
 * Vitest
 *   -> Node test runtime
 *   -> pure batch state / digest tests
 *   -> no cloudflare:workers import
 */
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['src/worker.test.ts', 'src/**/*.worker.test.ts'],
    include: ['src/**/*.test.ts'],
  },
})
