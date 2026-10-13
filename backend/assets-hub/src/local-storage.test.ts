import { createHash } from 'node:crypto'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import type { TUploadCapability } from './capability'
import { LocalObjectStore } from './local-storage'

const roots: string[] = []

const createStore = async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'groupher-assets-hub-'))
  roots.push(root)
  return new LocalObjectStore(root)
}

const uploadCapability = (body: Buffer, overrides: Partial<TUploadCapability> = {}) =>
  ({
    allowedMimeTypes: ['image/webp'],
    canonicalUrl: 'http://assets.test/a/asset-1/original',
    checksumSha256: createHash('sha256').update(body).digest('base64'),
    declaredAssetType: 'image',
    declaredFilename: 'fixture.webp',
    declaredHeight: 1,
    declaredMimeType: 'image/webp',
    declaredSizeBytes: body.byteLength,
    declaredThread: 'post',
    declaredWidth: 1,
    expiresAt: '2099-01-01T00:00:00.000Z',
    maxSizeBytes: 1024,
    objectKey: 'communities/home/generated/fixture.webp',
    purpose: 'generated_image',
    uploadRef: 'upload-1',
    assetPublicRef: 'asset-1',
    batchRef: 'batch-1',
    candidateOwnerRef: 'candidate-1',
    communityId: 1,
    communitySlug: 'home',
    variantKey: 'light-wide',
    ...overrides,
  }) as TUploadCapability

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { force: true, recursive: true })))
})

describe('LocalObjectStore', () => {
  it('verifies the declared checksum before storing bytes', async () => {
    const store = await createStore()
    const expected = Buffer.from('expected')
    const actual = Buffer.from('mismatch')
    await store.createUpload(
      uploadCapability(actual, {
        checksumSha256: createHash('sha256').update(expected).digest('base64'),
      }),
    )

    await expect(store.putUpload('upload-1', actual, 'image/webp')).rejects.toThrow(
      'checksum does not match',
    )
    await expect(store.objectExists('communities/home/generated/fixture.webp')).resolves.toBe(false)
  })

  it('keeps a successful upload intent retryable and serializes concurrent PUTs', async () => {
    const store = await createStore()
    const body = Buffer.from('fixture')
    await store.createUpload(uploadCapability(body))

    const results = await Promise.allSettled([
      store.putUpload('upload-1', body, 'image/webp'),
      store.putUpload('upload-1', body, 'image/webp'),
    ])

    expect(results.filter(({ status }) => status === 'fulfilled')).toHaveLength(2)
    await expect(store.putUpload('upload-1', body, 'image/webp')).resolves.toMatchObject({
      ContentLength: body.byteLength,
      ContentType: 'image/webp',
    })
    await expect(store.objectExists('communities/home/generated/fixture.webp')).resolves.toBe(true)
  })

  it('keeps object keys beneath the objects root', async () => {
    const store = await createStore()
    const body = Buffer.from('fixture')
    await store.createUpload(uploadCapability(body, { objectKey: '../uploads/hijack.json' }))

    await expect(store.putUpload('upload-1', body, 'image/webp')).rejects.toThrow(
      'escapes its storage root',
    )
    await expect(store.deleteObject('')).rejects.toThrow('escapes its storage root')
    await expect(store.headObject('../uploads/hijack.json')).rejects.toThrow(
      'escapes its storage root',
    )
  })
})
