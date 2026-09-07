import { createHash } from 'node:crypto'

import type {
  TGeneratedImageManifestEntry,
  TGeneratedImageUploadBatch,
} from '@groupher/contracts/wallpaper'
import { env, runInDurableObject } from 'cloudflare:test'
import { describe, expect, it } from 'vitest'

import { GeneratedImageBatchDO } from './generated-batch-do'

const bytes = new TextEncoder().encode('wallpaper-webp-fixture')
const digest = createHash('sha256').update(bytes).digest()
const checksum = `sha256:${Array.from(digest, (byte) => byte.toString(16).padStart(2, '0')).join('')}`

const batch = (publicRef: string): TGeneratedImageUploadBatch => ({
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
  expiresAt: '2099-09-02T17:00:00.000Z',
  publicRef,
  purpose: 'wallpaper-render',
  requestDigest: 'sha256:request',
  requestDigestVersion: 1,
})

const entry = (storageKey: string): TGeneratedImageManifestEntry => ({
  assetPublicRef: 'asset_1',
  candidateOwnerRef: 'wprev-light',
  checksum,
  height: 1080,
  mimeType: 'image/webp',
  storageKey,
  variantKey: 'light-wide',
  width: 1920,
})

describe('GeneratedImageBatchDO', () => {
  it('persists and returns a publish claim only after checking the R2 object', async () => {
    const publicRef = 'batch-complete'
    const storageKey = 'wallpaper-generated/complete.webp'
    await env.ASSETS_BUCKET.put(storageKey, bytes, {
      httpMetadata: { contentType: 'image/webp' },
      sha256: digest,
    })
    const stub = env.GENERATED_IMAGE_BATCHES.getByName(publicRef)

    await stub.create(batch(publicRef))
    await stub.registerAsset(entry(storageKey))
    const result = await stub.claimForPublish('save-1')

    expect(result.claim.type).toBe('publish')
    expect(result.manifest).toEqual([entry(storageKey)])
  })

  it('verifies the object body when a presigned upload has no R2 checksum metadata', async () => {
    const publicRef = 'batch-without-checksum-metadata'
    const storageKey = 'wallpaper-generated/without-checksum-metadata.webp'
    await env.ASSETS_BUCKET.put(storageKey, bytes, {
      httpMetadata: { contentType: 'image/webp' },
    })
    const stub = env.GENERATED_IMAGE_BATCHES.getByName(publicRef)

    await stub.create(batch(publicRef))
    await stub.registerAsset(entry(storageKey))
    const result = await stub.claimForPublish('save-1')

    expect(result.claim.type).toBe('publish')
    expect(result.manifest).toEqual([entry(storageKey)])
  })

  it('persists deletion and removes metadata when the manifest is incomplete', async () => {
    const publicRef = 'batch-incomplete'
    const stub = env.GENERATED_IMAGE_BATCHES.getByName(publicRef)
    await stub.create(batch(publicRef))

    expect(await stub.tryClaimForPublish('save-1')).toEqual({
      error: 'GENERATED_IMAGE_BATCH_INCOMPLETE_MANIFEST',
      ok: false,
    })
    expect(await stub.snapshot()).toBeNull()
  })

  it('deletes a registered manifest when the physical R2 object is missing', async () => {
    const publicRef = 'batch-object-missing'
    const stub = env.GENERATED_IMAGE_BATCHES.getByName(publicRef)
    await stub.create(batch(publicRef))
    await stub.registerAsset(entry('wallpaper-generated/missing.webp'))

    expect(await stub.tryClaimForPublish('save-1')).toEqual({
      error: 'GENERATED_IMAGE_BATCH_OBJECT_MISSING: light-wide',
      ok: false,
    })
    expect(await stub.snapshot()).toBeNull()
  })

  it('stores a delete claim before deleting an incomplete batch', async () => {
    const publicRef = 'batch-incomplete-transition'
    const stub = env.GENERATED_IMAGE_BATCHES.getByName(publicRef)
    await stub.create(batch(publicRef))

    expect(await stub.tryClaimForPublish('save-1')).toEqual({
      error: 'GENERATED_IMAGE_BATCH_INCOMPLETE_MANIFEST',
      ok: false,
    })
    await runInDurableObject(stub, async (_instance: GeneratedImageBatchDO, state) => {
      const rows = state.storage.sql
        .exec<{ count: number }>('SELECT COUNT(*) AS count FROM generated_batches')
        .toArray()
      expect(rows[0]?.count).toBe(0)
    })
  })

  it('keeps a publish claim when the final publication probe is unavailable', async () => {
    const publicRef = 'batch-cleanup-probe-unknown'
    const runtimeEnv = env as unknown as Record<string, unknown>
    const previousEndpoint = runtimeEnv.PHOENIX_GRAPHQL_ENDPOINT
    runtimeEnv.PHOENIX_GRAPHQL_ENDPOINT = ''

    try {
      const stub = env.GENERATED_IMAGE_BATCHES.getByName(publicRef)
      await stub.create(batch(publicRef))
      await runInDurableObject(stub, async (_instance: GeneratedImageBatchDO, state) => {
        state.storage.sql.exec(
          `UPDATE generated_batches
           SET claim_type = 'publish', claim_key = ?, claimed_at = ?, claim_expires_at = ?
           WHERE public_ref = ?`,
          `${publicRef}:publish`,
          '2099-09-02T16:00:00.000Z',
          '2099-09-02T16:15:00.000Z',
          publicRef,
        )
      })

      expect(await stub.tryCleanupPublishClaim(`${publicRef}:publish`)).toEqual({
        error: 'GENERATED_IMAGE_BATCH_PUBLISH_STATUS_UNKNOWN',
        ok: false,
      })
      expect(await stub.snapshot()).toMatchObject({ publicRef })
    } finally {
      if (previousEndpoint === undefined) delete runtimeEnv.PHOENIX_GRAPHQL_ENDPOINT
      else runtimeEnv.PHOENIX_GRAPHQL_ENDPOINT = previousEndpoint
    }
  })
})
