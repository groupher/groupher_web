import { BG_RENDER_TYPE } from '~/lib/bg'
import type { TBgRenderSpec } from '~/lib/bg'
import { GRADIENT_RENDERER, WALLPAPER_TEXTURE } from '~/lib/wallpaperMesh'

const mocks = vi.hoisted(() => ({
  createWebgl: vi.fn(),
  createVgpu: vi.fn(),
}))

vi.mock('./webgl', () => ({ createBgWebglRenderer: mocks.createWebgl }))
vi.mock('./vgpu/renderer', () => ({ createBgVgpuRenderer: mocks.createVgpu }))

import { createBgRendererAdapter } from './renderer'

const createMeshSpec = (): TBgRenderSpec => ({
  type: BG_RENDER_TYPE.MESH_GRADIENT,
  background: '#000000',
  filter: 'none',
  hasPattern: false,
  patternImage: '',
  patternOpacity: 0,
  patternColor: '#000000',
  hasTexture: false,
  source: 'test-flow',
  colors: ['#123456', '#abcdef'],
  colorStops: [0, 100],
  flow: 42,
  texture: { type: WALLPAPER_TEXTURE.NOISE, intensity: 0, params: {} },
  blurIntensity: 0,
  brightness: 100,
  saturation: 100,
  gradientRecipe: null,
  meshRecipe: {
    version: 2,
    renderer: GRADIENT_RENDERER.FLOW,
    preset: 'test',
    seed: 7,
    colors: ['#123456', '#abcdef'],
    angle: 42,
    softness: 64,
    warp: 58,
    scale: 56,
    contrast: 108,
    brightness: 105,
  },
  imageUrl: '',
})

const createRendererMock = () => ({
  update: vi.fn(),
  updatePreviewFrame: vi.fn(),
  isCanvasActive: vi.fn(() => true),
  resize: vi.fn(),
  destroy: vi.fn(),
})

describe('BgRenderer dual-canvas adapter', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'gpu', { configurable: true, value: {} })
  })

  it('keeps WebGL active until the vgpu first frame is ready', async () => {
    const webgl = createRendererMock()
    const vgpu = createRendererMock()
    const renderSize = [1200, 630] as const
    const engines: string[] = []
    mocks.createWebgl.mockReturnValue(webgl)
    mocks.createVgpu.mockResolvedValue(vgpu)

    const adapter = createBgRendererAdapter(
      document.createElement('canvas'),
      document.createElement('canvas'),
      createMeshSpec(),
      1,
      true,
      (engine) => engines.push(engine),
      undefined,
      undefined,
      renderSize,
    )

    expect(engines).toEqual(['webgl'])
    expect(mocks.createWebgl).toHaveBeenCalledWith(expect.any(HTMLCanvasElement), 1, renderSize)
    expect(webgl.update).toHaveBeenCalled()
    await vi.waitFor(() => expect(engines).toEqual(['webgl', 'webgpu']))
    expect(webgl.destroy).toHaveBeenCalledOnce()
    expect(vgpu.update).toHaveBeenCalled()
    expect(mocks.createVgpu).toHaveBeenCalledWith(
      expect.any(HTMLCanvasElement),
      expect.anything(),
      expect.any(Function),
      'auto',
      renderSize,
    )

    const previewSpec = { ...createMeshSpec(), flow: 88 }
    adapter.updatePreviewFrame(previewSpec)
    expect(vgpu.updatePreviewFrame).toHaveBeenCalledWith(previewSpec)
    expect(webgl.updatePreviewFrame).not.toHaveBeenCalled()
    adapter.destroy()
  })

  it('fails instead of falling back when vgpu initialization fails', async () => {
    const webgl = createRendererMock()
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const engines: string[] = []
    const failures: string[] = []
    mocks.createWebgl.mockReturnValue(webgl)
    mocks.createVgpu.mockRejectedValue(new Error('adapter unavailable'))

    const adapter = createBgRendererAdapter(
      document.createElement('canvas'),
      document.createElement('canvas'),
      createMeshSpec(),
      1,
      true,
      (engine) => engines.push(engine),
      ({ stage }) => failures.push(stage),
    )

    await vi.waitFor(() => expect(error).toHaveBeenCalled())
    expect(engines).toEqual(['webgl', 'failed'])
    expect(failures).toEqual(['adapter-init'])
    expect(webgl.destroy).toHaveBeenCalledOnce()
    expect(webgl.update).toHaveBeenCalled()
    expect(adapter.isCanvasActive()).toBe(false)
    adapter.destroy()
  })

  it('fails explicitly when WebGPU is unavailable', async () => {
    Object.defineProperty(navigator, 'gpu', { configurable: true, value: undefined })
    const webgl = createRendererMock()
    const engines: string[] = []
    const failures: string[] = []
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    mocks.createWebgl.mockReturnValue(webgl)

    const adapter = createBgRendererAdapter(
      document.createElement('canvas'),
      document.createElement('canvas'),
      createMeshSpec(),
      1,
      true,
      (engine) => engines.push(engine),
      ({ stage }) => failures.push(stage),
    )

    expect(engines).toEqual(['webgl', 'failed'])
    expect(failures).toEqual(['capability-check'])
    expect(webgl.destroy).toHaveBeenCalledOnce()
    expect(adapter.isCanvasActive()).toBe(false)
    adapter.destroy()
  })

  it('fails when a vgpu renderer becomes ineligible before activation completes', async () => {
    const webgl = createRendererMock()
    const vgpu = createRendererMock()
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    let resolveVgpu: ((renderer: typeof vgpu) => void) | undefined
    mocks.createWebgl.mockReturnValue(webgl)
    mocks.createVgpu.mockReturnValue(
      new Promise((resolve) => {
        resolveVgpu = resolve
      }),
    )
    const spec = createMeshSpec()
    const adapter = createBgRendererAdapter(
      document.createElement('canvas'),
      document.createElement('canvas'),
      spec,
      1,
      true,
      vi.fn(),
    )

    await vi.waitFor(() => expect(mocks.createVgpu).toHaveBeenCalled())
    adapter.update({ ...spec, type: BG_RENDER_TYPE.IMAGE, imageUrl: '' })
    resolveVgpu?.(vgpu)
    await vi.waitFor(() => expect(vgpu.destroy).toHaveBeenCalled())
    expect(webgl.destroy).toHaveBeenCalledOnce()
    expect(adapter.isCanvasActive()).toBe(false)
    adapter.destroy()
  })
})
