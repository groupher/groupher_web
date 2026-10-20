import assert from 'node:assert/strict'
import test from 'node:test'

import {
  activePolicyBoundaryFindings,
  classify,
  matchesLegacyOwner,
  policyBoundaryFindings,
} from './check-policy-boundary.mjs'

test('current runtime and contract roots contain no legacy Policy owners', () => {
  assert.deepEqual(activePolicyBoundaryFindings(), [])
})

test('legacy references remain reportable without becoming active failures', () => {
  const findings = policyBoundaryFindings([
    'docs/migrations/policy-boundary-fix.md',
    'docs/architecture/backend-module-reorganization.md',
    'docs/architecture/public-cache-invalidation.md',
    'docs/architecture/article-stats-target.md',
  ])

  assert.ok(findings.length > 0)
  assert.ok(findings.every(({ classification }) => classification === 'historical'))
})

test('generated pipeline graph references are classified separately', () => {
  assert.equal(classify('backend/api/priv/pipeline_graph.json'), 'generated')
})

test('legacy owner matching covers the old policy test module name', () => {
  assert.equal(matchesLegacyOwner('NamePolicy', 'NamePolicyTest'), true)
})
