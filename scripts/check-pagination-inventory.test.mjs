import test from 'node:test'
import assert from 'node:assert/strict'

import { paginationInventory } from './check-pagination-inventory.mjs'

test('confirms the legacy paginator inventory is empty after migration', () => {
  const manifest = paginationInventory()

  assert.equal(manifest.scope.mode, 'report_only')
  assert.equal(manifest.summary.executable_calls, 0)
  assert.equal(manifest.summary.executable_files, 0)
  assert.equal(manifest.summary.helper_definitions, 0)
  assert.equal(manifest.summary.raw_matches, 0)
  assert.equal(manifest.entries.some((entry) => entry.kind === 'executable_call' && entry.source.includes('/test/')), false)
})

test('keeps documentation and test references out of the executable inventory', () => {
  const manifest = paginationInventory()

  assert.equal(manifest.entries.some((entry) => entry.source.includes('/test/')), false)
  assert.equal(manifest.entries.some((entry) => entry.symbol === 'Repo.paginate'), false)
})
