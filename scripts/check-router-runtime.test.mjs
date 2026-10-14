import assert from 'node:assert/strict'
import test from 'node:test'

import { collectResolvedRouterVersions } from './check-router-runtime.mjs'

test('collects pnpm router package and snapshot resolutions', () => {
  const lockfile = `
  '@tanstack/react-router@1.170.44':
  '@tanstack/react-router@1.170.44(react-dom@19.3.0(react@19.3.0))':
  `

  assert.deepEqual([...collectResolvedRouterVersions(lockfile)], ['1.170.44'])
})
