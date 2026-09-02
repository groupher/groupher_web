import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  assetTypeFromMime: vi.fn(),
  browserGraphQLRequest: vi.fn(),
  checksumSha256: vi.fn(),
  putFileWithProgress: vi.fn(),
}))

vi.mock('~/graphql/client', () => ({
  browserGraphQLRequest: mocks.browserGraphQLRequest,
}))

vi.mock('./helper', () => ({
  assetTypeFromMime: mocks.assetTypeFromMime,
  checksumSha256: mocks.checksumSha256,
  extractErrorMessage: (error: unknown) => (error instanceof Error ? error.message : String(error)),
  putFileWithProgress: mocks.putFileWithProgress,
}))

import { uploadCommunityAsset } from './uploadCommunityAsset'

const createResponse = (payload: unknown, ok = true): Response =>
  ({
    json: async () => payload,
    ok,
  }) as Response

describe('uploadCommunityAsset', () => {
  beforeEach(() => {
    mocks.assetTypeFromMime.mockReturnValue('IMAGE')
    mocks.browserGraphQLRequest.mockResolvedValue({
      createCommunityAssetUploadIntent: {
        assetPublicRef: 'asset-public-ref',
        capability: 'capability-token',
        uploadRef: 'upload-ref',
      },
    })
    mocks.checksumSha256.mockResolvedValue('checksum')
    mocks.putFileWithProgress.mockResolvedValue(undefined)
    vi.stubGlobal('fetch', vi.fn())
  })

  it('runs the existing upload protocol without inventing a thread', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock
      .mockResolvedValueOnce(
        createResponse({
          result: {
            upload: {
              headers: { 'content-type': 'image/webp' },
              method: 'PUT',
              url: 'https://upload.example.test/object',
            },
          },
        }),
      )
      .mockResolvedValueOnce(
        createResponse({ result: { timings: [{ duration: 12, label: 'r2' }] } }),
      )

    const file = new File(['wallpaper'], 'wallpaper.webp', { type: 'image/webp' })
    const onStage = vi.fn()
    const result = await uploadCommunityAsset({ community: 'demo', file, onStage })

    expect(result).toEqual({
      assetPublicRef: 'asset-public-ref',
      timings: [{ duration: 12, label: 'r2' }],
      uploadRef: 'upload-ref',
    })
    expect(mocks.browserGraphQLRequest).toHaveBeenCalledWith(expect.anything(), {
      community: 'demo',
      file: {
        assetType: 'IMAGE',
        checksumSha256: 'checksum',
        filename: 'wallpaper.webp',
        mimeType: 'image/webp',
        sizeBytes: file.size,
      },
    })
    expect(mocks.putFileWithProgress).toHaveBeenCalledWith(
      expect.objectContaining({ file, method: 'PUT', url: 'https://upload.example.test/object' }),
    )
    expect(onStage.mock.calls.map(([stage, state]) => `${stage}:${state}`)).toEqual([
      'checksum:running',
      'checksum:done',
      'intent:running',
      'intent:done',
      'presign:running',
      'presign:done',
      'put:running',
      'put:done',
      'finalize:running',
      'finalize:done',
    ])
  })

  it('reports the finalize stage when the asset service rejects finalization', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock
      .mockResolvedValueOnce(
        createResponse({
          result: {
            upload: { headers: {}, method: 'PUT', url: 'https://upload.example.test/object' },
          },
        }),
      )
      .mockResolvedValueOnce(createResponse({ error: 'checksum mismatch' }, false))

    const file = new File(['wallpaper'], 'wallpaper.webp', { type: 'image/webp' })
    const error = await uploadCommunityAsset({ community: 'demo', file }).catch((caught) => caught)

    expect(error).toMatchObject({
      message: expect.stringContaining('ASSETS_HUB_UPLOAD_FINALIZE_FAILED'),
      stage: 'finalize',
    })
  })
})
