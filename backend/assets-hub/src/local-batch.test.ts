import { createHash } from 'node:crypto'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type {
  TGeneratedImageManifestEntry,
  TGeneratedImageUploadBatchTarget,
} from '@groupher/contracts/wallpaper'
import { afterEach, describe, expect, it } from 'vitest'

import type { TGeneratedImageBatchCapability, TUploadCapability } from './capability'
import { LocalGeneratedBatchStore } from './local-batch'
import { LocalObjectStore } from './local-storage'

const roots: string[] = []

const createStores = async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'groupher-assets-batch-'))
  roots.push(root)
  const objects = new LocalObjectStore(root)
  return {
    batches: new LocalGeneratedBatchStore(objects, {}),
    objects,
  }
}

const targets: TGeneratedImageUploadBatchTarget[] = ['wide', 'desktop', 'tablet', 'mobile'].map(
  (profile) => ({
    candidateOwnerRef: `candidate-${profile}`,
    height: 1,
    mimeType: 'image/webp',
    variantKey: `light-${profile}`,
    width: 1,
  }),
)

const batchCapability: TGeneratedImageBatchCapability = {
  capabilityPurpose: 'generated_image_batch',
  batchRef: 'batch-1',
  expectedVariants: targets,
  expiresAt: '2099-01-01T00:00:00.000Z',
  purpose: 'wallpaper-render',
  requestDigest: 'sha256:request',
  requestDigestVersion: 1,
}

const putVariant = async (
  objects: LocalObjectStore,
  target: TGeneratedImageUploadBatchTarget,
): Promise<TGeneratedImageManifestEntry> => {
  const body = Buffer.from(target.variantKey)
  const checksumHex = createHash('sha256').update(body).digest('hex')
  const checksumBase64 = createHash('sha256').update(body).digest('base64')
  const objectKey = `communities/home/generated/${target.variantKey}.webp`
  const uploadRef = `upload-${target.variantKey}`
  const assetPublicRef = `asset-${target.variantKey}`
  await objects.createUpload({
    allowedMimeTypes: ['image/webp'],
    assetPublicRef,
    batchRef: batchCapability.batchRef,
    candidateOwnerRef: target.candidateOwnerRef,
    canonicalUrl: `http://assets.test/a/${assetPublicRef}/original`,
    checksumSha256: checksumBase64,
    communityId: 1,
    communitySlug: 'home',
    declaredAssetType: 'image',
    declaredFilename: `${target.variantKey}.webp`,
    declaredHeight: target.height,
    declaredMimeType: target.mimeType,
    declaredSizeBytes: body.byteLength,
    declaredThread: 'post',
    declaredWidth: target.width,
    expiresAt: batchCapability.expiresAt,
    maxSizeBytes: 1024,
    objectKey,
    purpose: 'generated_image',
    uploadRef,
    variantKey: target.variantKey,
  } satisfies TUploadCapability)
  await objects.putUpload(uploadRef, body, target.mimeType)

  return {
    assetPublicRef,
    candidateOwnerRef: target.candidateOwnerRef,
    checksum: `sha256:${checksumHex}`,
    height: target.height,
    mimeType: target.mimeType,
    storageKey: objectKey,
    variantKey: target.variantKey,
    width: target.width,
  }
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { force: true, recursive: true })))
})

describe('LocalGeneratedBatchStore', () => {
  it('serializes concurrent asset registration without dropping manifest entries', async () => {
    const { batches, objects } = await createStores()
    await batches.create(batchCapability)
    const entries = await Promise.all(targets.map((target) => putVariant(objects, target)))

    await Promise.all(
      entries.map((entry) => batches.registerAsset(batchCapability.batchRef, entry)),
    )
    const result = await batches.claimForPublish(batchCapability.batchRef, 'publish-1')

    expect(result.manifest.map(({ variantKey }) => variantKey)).toEqual(
      targets.map(({ variantKey }) => variantKey),
    )
  })

  it('rejects cancellation after a publish claim and retains published objects', async () => {
    const { batches, objects } = await createStores()
    await batches.create({ ...batchCapability, expectedVariants: [targets[0]!] })
    const entry = await putVariant(objects, targets[0]!)
    await batches.registerAsset(batchCapability.batchRef, entry)
    await batches.claimForPublish(batchCapability.batchRef, 'publish-1')

    await expect(batches.cancel(batchCapability.batchRef)).rejects.toThrow('ALREADY_CLAIMED')
    await expect(objects.objectExists(entry.storageKey)).resolves.toBe(true)
  })

  it('removes an incomplete batch instead of leaving orphaned metadata', async () => {
    const { batches } = await createStores()
    await batches.create(batchCapability)

    await expect(batches.claimForPublish(batchCapability.batchRef, 'publish-1')).rejects.toThrow(
      'INCOMPLETE_MANIFEST',
    )
    await expect(batches.cancel(batchCapability.batchRef)).rejects.toThrow('NOT_FOUND')
  })
})
