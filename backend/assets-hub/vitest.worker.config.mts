/**
 * Runs generated Batch integration tests inside the Cloudflare Workers runtime.
 *
 * Vitest
 *   -> Cloudflare pool
 *   -> workerd with Wrangler test bindings
 *   -> generated Batch integration tests
 */
import { cloudflareTest } from '@cloudflare/vitest-pool-workers'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: { configPath: './wrangler.test.jsonc' },
    }),
  ],
  test: {
    include: ['src/**/*.worker.test.ts', 'src/worker.test.ts'],
  },
})
