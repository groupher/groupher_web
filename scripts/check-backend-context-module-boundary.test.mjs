import assert from 'node:assert/strict'
import test from 'node:test'

import {
  backendContextBoundaryFindings,
  executableLines,
} from './check-backend-context-module-boundary.mjs'

test('migrated backend context owners satisfy the manifest', () => {
  assert.deepEqual(backendContextBoundaryFindings(), [])
})

test('masks documentation and string examples before boundary checks', () => {
  const lines = executableLines(`
    # Repo.transaction(fn -> :ok end)
    def explain, do: "ORM.create(User, attrs)"
  `)

  assert.equal(lines.some((line) => /Repo\\.|ORM\\./.test(line)), false)
})
