import { GRADIENT_WALLPAPER_NAME, WALLPAPER_TYPE } from '~/const/wallpaper'
import type { TExportedImageVariant } from '~/render/ImageExport'
import { initState } from '~/stores/wallpaper/helper'

import { executeWallpaperPublish, type TWallpaperPublishExecutorDeps } from './publishExecutor'
import { buildWallpaperPublishPlan } from './publishPlan'

const exportedImages: TExportedImageVariant[] = ['wide', 'desktop', 'tablet', 'phone'].map(
  (profile) => ({
    blob: new Blob([profile]),
    checksum: `${profile}-checksum`,
    height: 100,
    mimeType: 'image/webp',
    targetKey: `light-${profile}`,
    width: 100,
  }),
)

const makeNonePlan = () =>
  buildWallpaperPublishPlan({
    baseVersion: 7,
    community: 'home',
    theme: 'light',
    wallpaper: { ...initState({}).light, type: WALLPAPER_TYPE.NONE },
  })

const makeGeneratedPlan = () =>
  buildWallpaperPublishPlan({
    baseVersion: 7,
    community: 'home',
    theme: 'light',
    wallpaper: {
      ...initState({}).light,
      source: GRADIENT_WALLPAPER_NAME.AMBER_MAUVE,
      type: WALLPAPER_TYPE.GRADIENT,
    },
  })

const makeDeps = (overrides: Partial<TWallpaperPublishExecutorDeps> = {}) => ({
  cancelBatch: vi.fn().mockResolvedValue(undefined),
  createBatch: vi.fn().mockResolvedValue(undefined),
  exportBatch: vi.fn().mockResolvedValue(exportedImages),
  graphqlRequest: vi.fn(),
  hasWebGPU: vi.fn().mockReturnValue(true),
  uploadImage: vi.fn().mockResolvedValue(undefined),
  ...overrides,
})

const preparedBatch = {
  batchCapability: 'batch-capability',
  batchRef: 'batch-ref',
  uploadIntents: ['wide', 'desktop', 'tablet', 'phone'].map((profile) => ({
    capability: `${profile}-capability`,
    profile,
    uploadRef: `${profile}-upload`,
  })),
}

describe('executeWallpaperPublish', () => {
  it('publishes NONE without export or Assets Hub calls', async () => {
    const deps = makeDeps()
    deps.graphqlRequest.mockResolvedValue({ publishWallpaper: { version: 8 } })

    const result = await executeWallpaperPublish(makeNonePlan(), 'key-1', deps)

    expect(result).toEqual({ version: 8 })
    expect(deps.hasWebGPU).not.toHaveBeenCalled()
    expect(deps.exportBatch).not.toHaveBeenCalled()
    expect(deps.createBatch).not.toHaveBeenCalled()
    expect(deps.cancelBatch).not.toHaveBeenCalled()
    expect(deps.graphqlRequest).toHaveBeenCalledTimes(1)
  })

  it('does not call GraphQL or cancel when export fails', async () => {
    const deps = makeDeps({
      exportBatch: vi.fn().mockRejectedValue(new Error('export failed')),
    })

    await expect(executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)).rejects.toThrow(
      'export failed',
    )
    expect(deps.graphqlRequest).not.toHaveBeenCalled()
    expect(deps.cancelBatch).not.toHaveBeenCalled()
  })

  it('does not call GraphQL or cancel when WebGPU is unavailable', async () => {
    const deps = makeDeps({ hasWebGPU: vi.fn().mockReturnValue(false) })

    await expect(executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)).rejects.toThrow(
      'WebGPU is required to publish this Wallpaper',
    )
    expect(deps.exportBatch).not.toHaveBeenCalled()
    expect(deps.graphqlRequest).not.toHaveBeenCalled()
    expect(deps.cancelBatch).not.toHaveBeenCalled()
  })

  it('does not cancel when prepare returns an empty batch', async () => {
    const deps = makeDeps()
    deps.graphqlRequest.mockResolvedValue({ prepareWallpaperUpload: null })

    await expect(executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)).rejects.toThrow(
      'WALLPAPER_PREPARE_EMPTY_RESPONSE',
    )
    expect(deps.createBatch).not.toHaveBeenCalled()
    expect(deps.cancelBatch).not.toHaveBeenCalled()
  })

  it('executes generated publish in export, prepare, create, upload, publish order', async () => {
    const events: string[] = []
    const deps = makeDeps({
      createBatch: vi.fn().mockImplementation(async () => events.push('create')),
      exportBatch: vi.fn().mockImplementation(async () => {
        events.push('export')
        return exportedImages
      }),
      uploadImage: vi.fn().mockImplementation(async () => events.push('upload')),
    })
    deps.graphqlRequest.mockImplementation(async (_document, variables) => {
      if ('images' in variables.input) {
        events.push('prepare')
        return { prepareWallpaperUpload: preparedBatch }
      }
      events.push('publish')
      return { publishWallpaper: { version: 8 } }
    })

    await executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)

    expect(events).toEqual([
      'export',
      'prepare',
      'create',
      'upload',
      'upload',
      'upload',
      'upload',
      'publish',
    ])
    expect(deps.cancelBatch).not.toHaveBeenCalled()
  })

  it('cancels the batch when an upload fails', async () => {
    const deps = makeDeps({
      uploadImage: vi.fn().mockRejectedValue(new Error('upload failed')),
    })
    deps.graphqlRequest.mockResolvedValue({ prepareWallpaperUpload: preparedBatch })

    await expect(executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)).rejects.toThrow(
      'upload failed',
    )
    expect(deps.cancelBatch).toHaveBeenCalledWith('batch-ref', 'batch-capability')
  })

  it('cancels the batch when Assets Hub batch creation fails', async () => {
    const deps = makeDeps({
      createBatch: vi.fn().mockRejectedValue(new Error('create failed')),
    })
    deps.graphqlRequest.mockResolvedValue({ prepareWallpaperUpload: preparedBatch })

    await expect(executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)).rejects.toThrow(
      'create failed',
    )
    expect(deps.cancelBatch).toHaveBeenCalledWith('batch-ref', 'batch-capability')
  })

  it('cancels the batch when publish explicitly fails', async () => {
    const deps = makeDeps()
    deps.graphqlRequest
      .mockResolvedValueOnce({ prepareWallpaperUpload: preparedBatch })
      .mockRejectedValueOnce(new Error('publish failed'))

    await expect(executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)).rejects.toThrow(
      'publish failed',
    )
    expect(deps.cancelBatch).toHaveBeenCalledWith('batch-ref', 'batch-capability')
  })

  it('does not cancel when publish resolves with an empty payload', async () => {
    const deps = makeDeps()
    deps.graphqlRequest
      .mockResolvedValueOnce({ prepareWallpaperUpload: preparedBatch })
      .mockResolvedValueOnce({ publishWallpaper: null })

    const result = await executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)

    expect(result).toBeNull()
    expect(deps.cancelBatch).not.toHaveBeenCalled()
  })

  it('keeps the publish error when cleanup also fails', async () => {
    const deps = makeDeps({
      cancelBatch: vi.fn().mockRejectedValue(new Error('cancel failed')),
    })
    deps.graphqlRequest
      .mockResolvedValueOnce({ prepareWallpaperUpload: preparedBatch })
      .mockRejectedValueOnce(new Error('publish failed'))

    await expect(executeWallpaperPublish(makeGeneratedPlan(), 'key-1', deps)).rejects.toThrow(
      'publish failed',
    )
  })
})
