import { BG_RENDER_TYPE } from '~/lib/bg'
import type { TBgRenderSpec } from '~/lib/bg'
import { GRADIENT_RENDERER, GRADIENT_SHAPE, WALLPAPER_TEXTURE } from '~/lib/wallpaperMesh'

import { isVgpuWallpaperSpec } from './eligibility'
import { toVgpuMeshParams } from './params'

const createMeshSpec = (
  renderer: GRADIENT_RENDERER.FLOW | GRADIENT_RENDERER.LIQUID,
): TBgRenderSpec => ({
  type: BG_RENDER_TYPE.MESH_GRADIENT,
  background: '#000000',
  filter: 'none',
  hasPattern: false,
  patternImage: '',
  patternOpacity: 0,
  patternColor: '#000000',
  hasTexture: false,
  source: 'test-mesh',
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
    renderer,
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

describe('BgRenderer vgpu contract', () => {
  it('accepts texture-free gradients and Flow/Liquid mesh specs', () => {
    const flow = createMeshSpec(GRADIENT_RENDERER.FLOW)
    const liquid = createMeshSpec(GRADIENT_RENDERER.LIQUID)

    expect(isVgpuWallpaperSpec(flow)).toBe(true)
    expect(isVgpuWallpaperSpec(liquid)).toBe(true)
    expect(
      isVgpuWallpaperSpec({
        ...flow,
        hasTexture: true,
        texture: { ...flow.texture, type: WALLPAPER_TEXTURE.NOISE },
      }),
    ).toBe(true)
    expect(isVgpuWallpaperSpec({ ...flow, type: BG_RENDER_TYPE.LINEAR_GRADIENT })).toBe(true)
    expect(isVgpuWallpaperSpec({ ...flow, type: BG_RENDER_TYPE.RADIAL_GRADIENT })).toBe(true)
    expect(
      isVgpuWallpaperSpec({ ...flow, type: BG_RENDER_TYPE.IMAGE, imageUrl: '/test.webp' }),
    ).toBe(true)
    expect(isVgpuWallpaperSpec({ ...flow, blurIntensity: 10 })).toBe(true)
  })

  it('maps the canonical recipe to the reflected WGSL uniform shape', () => {
    const params = toVgpuMeshParams(createMeshSpec(GRADIENT_RENDERER.LIQUID))

    expect(params).toMatchObject({
      colorCount: 2,
      meshModel: 2,
      flow: 42,
      softness: 64,
      meshSeed: 7,
      meshWarp: 58,
      meshScale: 56,
      meshBrightness: 1.05,
      meshContrast: 1.08,
      globalBrightness: 1,
      globalSaturation: 1,
      blurRadius: 0,
      radialCenter: [0.5, 0.5],
      radialRadius: 0.72,
      textureType: 0,
      textureIntensity: 0,
      textureScale: 1,
      resolution: [1, 1],
      imageSize: [1, 1],
      imageReady: 0,
    })
    expect(params.color0).toEqual([0x12 / 255, 0x34 / 255, 0x56 / 255, 1])
    expect(params.stops0).toEqual([0, 1, 1, 1])
    expect(params.patternOpacity).toBe(0)
    expect(params.patternRepeat).toEqual([1, 1])
  })

  it('maps global effects and radial gradient parameters for the shared shader', () => {
    const params = toVgpuMeshParams({
      ...createMeshSpec(GRADIENT_RENDERER.FLOW),
      type: BG_RENDER_TYPE.RADIAL_GRADIENT,
      brightness: 88,
      saturation: 122,
      gradientRecipe: {
        version: 2,
        renderer: GRADIENT_RENDERER.RADIAL,
        preset: 'test-radial',
        colors: ['#123456', '#abcdef'],
        center: { x: 0.3, y: 0.7 },
        radius: 64,
        shape: GRADIENT_SHAPE.ELLIPSE,
        spread: 0,
      },
      meshRecipe: null,
    })

    expect(params.meshModel).toBe(3)
    expect(params.globalBrightness).toBe(0.88)
    expect(params.globalSaturation).toBe(1.22)
    expect(params.radialCenter).toEqual([0.3, 0.7])
    expect(params.radialRadius).toBe(0.64)
  })

  it('maps the blur control to the shared shader radius', () => {
    const params = toVgpuMeshParams({
      ...createMeshSpec(GRADIENT_RENDERER.FLOW),
      blurIntensity: 50,
    })

    expect(params.blurRadius).toBe(3)
  })

  it('maps an enabled pattern to color, opacity, and repeat uniforms', () => {
    const params = toVgpuMeshParams(
      {
        ...createMeshSpec(GRADIENT_RENDERER.FLOW),
        hasPattern: true,
        patternColor: '#ffffff',
        patternOpacity: 0.65,
      },
      [4.5, 1.25],
    )

    expect(params.patternColor).toEqual([1, 1, 1, 1])
    expect(params.patternOpacity).toBe(0.65)
    expect(params.patternRepeat).toEqual([4.5, 1.25])
  })

  it('maps procedural texture type and intensity to the shared shader', () => {
    const params = toVgpuMeshParams({
      ...createMeshSpec(GRADIENT_RENDERER.FLOW),
      hasTexture: true,
      texture: {
        ...createMeshSpec(GRADIENT_RENDERER.FLOW).texture,
        type: WALLPAPER_TEXTURE.OIL,
        intensity: 72,
      },
    })

    expect(params.textureType).toBe(9)
    expect(params.textureIntensity).toBe(0.72)
    expect(params.textureScale).toBe(1)
    expect(params.resolution).toEqual([1, 1])
  })

  it('maps image backgrounds to the image shader model', () => {
    const params = toVgpuMeshParams({
      ...createMeshSpec(GRADIENT_RENDERER.FLOW),
      type: BG_RENDER_TYPE.IMAGE,
      imageUrl: '/wallpaper/photo.webp',
      meshRecipe: null,
    })

    expect(params.meshModel).toBe(4)
    expect(params.imageReady).toBe(0)
    expect(params.imageSize).toEqual([1, 1])
  })
})
