import { readFileSync } from 'node:fs'

import type {
  TGeneratedImageManifestEntry,
  TGeneratedImageUploadBatch,
} from '@groupher/contracts/wallpaper'
import { describe, expect, it } from 'vitest'

import {
  GeneratedImageBatchState,
  generatedBatchCleanupDecision,
  generatedBatchReconciliationBackoffMs,
  manifestDigest,
} from './generated-batch'

const digestFixture = JSON.parse(
  readFileSync(
    new URL(
      '../../../packages/contracts/fixtures/wallpaper-manifest-digest-v1.json',
      import.meta.url,
    ),
    'utf8',
  ),
) as {
  digest: string
  manifest: TGeneratedImageManifestEntry[]
}

const batch: TGeneratedImageUploadBatch = {
  claim: null,
  expectedVariants: [
    {
      candidateOwnerRef: 'wprev-light',
      height: 1080,
      mimeType: 'image/webp',
      variantKey: 'light-wide',
      width: 1920,
    },
  ],
  expiresAt: '2026-09-02T17:00:00.000Z',
  publicRef: 'batch_1',
  purpose: 'wallpaper-render',
  requestDigest: 'sha256:request',
  requestDigestVersion: 1,
}

describe('GeneratedImageBatchState', () => {
  it('matches the shared manifest digest golden fixture', () => {
    expect(manifestDigest(digestFixture.manifest)).toBe(digestFixture.digest)
  })

  it('freezes a complete manifest and returns the same publish claim on retry', () => {
    const state = new GeneratedImageBatchState(batch, 60_000)
    state.registerAsset({
      assetPublicRef: 'asset_1',
      candidateOwnerRef: 'wprev-light',
      checksum: 'checksum_1',
      height: 1080,
      mimeType: 'image/webp',
      storageKey: 'communities/demo/generated/one.webp',
      variantKey: 'light-wide',
      width: 1920,
    })

    const first = state.claimForPublish('save_1', Date.parse('2026-09-02T16:00:00.000Z'))
    const retry = state.claimForPublish('save_1', Date.parse('2026-09-02T16:00:01.000Z'))

    expect(retry).toEqual(first)
    expect(() => state.registerAsset(first.manifest[0]!)).toThrow('MANIFEST_FROZEN')
    expect(() => state.claimForDelete('cleanup_1')).toThrow('ALREADY_CLAIMED')
  })

  it('turns an incomplete manifest into a delete claim without a retryable middle state', () => {
    const state = new GeneratedImageBatchState(batch, 60_000)

    expect(() => state.claimForPublish('save_1', Date.parse('2026-09-02T16:00:00.000Z'))).toThrow(
      'INCOMPLETE_MANIFEST',
    )
    expect(() => state.claimForDelete('cleanup_1')).toThrow('ALREADY_CLAIMED')
  })

  it('checks batch expiry before reporting an incomplete manifest', () => {
    const state = new GeneratedImageBatchState(batch, 60_000)

    expect(() => state.claimForPublish('save_1', Date.parse('2026-09-02T18:00:00.000Z'))).toThrow(
      'EXPIRED',
    )
  })

  it('does not replay an expired publish capability', () => {
    const state = new GeneratedImageBatchState(batch, 60_000)
    state.registerAsset({
      assetPublicRef: 'asset_1',
      candidateOwnerRef: 'wprev-light',
      checksum: 'checksum_1',
      height: 1080,
      mimeType: 'image/webp',
      storageKey: 'communities/demo/generated/one.webp',
      variantKey: 'light-wide',
      width: 1920,
    })

    state.claimForPublish('save_1', Date.parse('2026-09-02T16:00:00.000Z'))

    expect(() => state.claimForPublish('save_1', Date.parse('2026-09-02T16:01:00.000Z'))).toThrow(
      'CLAIM_EXPIRED',
    )
  })

  it('keeps reconciliation backoff bounded and monotonic', () => {
    expect(generatedBatchReconciliationBackoffMs(1)).toBe(5 * 60 * 1000)
    expect(generatedBatchReconciliationBackoffMs(6)).toBe(160 * 60 * 1000)
    expect(generatedBatchReconciliationBackoffMs(7)).toBe(320 * 60 * 1000)
    expect(generatedBatchReconciliationBackoffMs(100)).toBeLessThanOrEqual(24 * 60 * 60 * 1000)
  })

  it('never deletes when the final publication probe is unknown or published', () => {
    expect(generatedBatchCleanupDecision(null)).toBe('retry')
    expect(generatedBatchCleanupDecision(true)).toBe('retain')
    expect(generatedBatchCleanupDecision(false)).toBe('delete')
  })
})
