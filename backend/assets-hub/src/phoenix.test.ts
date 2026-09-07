import { describe, expect, it } from 'vitest'

import { registerGeneratedAsset } from './phoenix'

describe('registerGeneratedAsset', () => {
  it('never falls back from the internal Batch endpoint to the public read endpoint', async () => {
    await expect(
      registerGeneratedAsset({
        capability: {
          allowedMimeTypes: ['image/webp'],
          assetPublicRef: 'asset_1',
          batchRef: 'batch_1',
          candidateOwnerRef: 'owner_1',
          canonicalUrl: 'https://assets.example/image.webp',
          communityId: 1,
          communitySlug: 'demo',
          declaredAssetType: 'image',
          declaredFilename: 'image.webp',
          declaredHeight: 100,
          declaredMimeType: 'image/webp',
          declaredSizeBytes: 100,
          declaredThread: 'post',
          declaredWidth: 100,
          expiresAt: '2099-01-01T00:00:00.000Z',
          maxSizeBytes: 1_000,
          objectKey: 'generated/image.webp',
          purpose: 'generated_image',
          uploadRef: 'upload_1',
          variantKey: 'light-wide',
        },
        capabilityToken: 'capability',
        entry: { checksum: 'checksum', storageKey: 'generated/image.webp' },
        environment: { ASSETS_PUBLIC_ENDPOINT: 'https://assets.example' },
      }),
    ).rejects.toThrow('ASSETS_HUB_BATCH_ENDPOINT is required')
  })
})
