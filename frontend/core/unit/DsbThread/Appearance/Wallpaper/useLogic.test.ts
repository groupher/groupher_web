import {
  GRADIENT_WALLPAPER,
  GRADIENT_WALLPAPER_NAME,
  WALLPAPER_PATTERN_TONE,
  WALLPAPER_TYPE,
} from '~/const/wallpaper'
import {
  composeGradientRecipeForRenderer,
  getGradientRecipeSpread,
  GRADIENT_RENDERER,
  WALLPAPER_TEXTURE,
} from '~/lib/wallpaperMesh'
import type { TWallpaperThemeState } from '~/stores/wallpaper/spec'

import {
  composeGradientWallpaperPatch,
  requiresWallpaperExport,
  serializeWallpaperPatch,
} from './useLogic'

describe('composeGradientWallpaperPatch', () => {
  it('defaults to linear when switching from picture to gradient', () => {
    const previousGradient = composeGradientRecipeForRenderer(
      GRADIENT_WALLPAPER[GRADIENT_WALLPAPER_NAME.VIOLET_TEAL_AMBER],
      GRADIENT_RENDERER.LIQUID,
    )

    const patch = composeGradientWallpaperPatch(
      { type: WALLPAPER_TYPE.PATTERN, gradient: previousGradient },
      GRADIENT_WALLPAPER_NAME.STONE_GREEN,
    )

    expect(patch.type).toBe(WALLPAPER_TYPE.GRADIENT)
    expect(patch.source).toBe(GRADIENT_WALLPAPER_NAME.STONE_GREEN)
    expect(patch.gradient?.renderer).toBe(GRADIENT_RENDERER.LINEAR)
  })

  it('keeps the active renderer when switching presets inside gradient mode', () => {
    const previousGradient = composeGradientRecipeForRenderer(
      GRADIENT_WALLPAPER[GRADIENT_WALLPAPER_NAME.VIOLET_TEAL_AMBER],
      GRADIENT_RENDERER.LIQUID,
    )

    const patch = composeGradientWallpaperPatch(
      { type: WALLPAPER_TYPE.GRADIENT, gradient: previousGradient },
      GRADIENT_WALLPAPER_NAME.STONE_GREEN,
    )

    expect(patch.gradient?.renderer).toBe(GRADIENT_RENDERER.LIQUID)
    expect(patch.gradient?.angle).toBe(previousGradient.angle)
    expect(patch.gradient && getGradientRecipeSpread(patch.gradient)).toBe(
      getGradientRecipeSpread(previousGradient),
    )
    expect(patch.gradient?.colors).toEqual(
      GRADIENT_WALLPAPER[GRADIENT_WALLPAPER_NAME.STONE_GREEN].colors,
    )
  })

  it('keeps the original gradient shape after switching away and back', () => {
    const originalGradient = GRADIENT_WALLPAPER[GRADIENT_WALLPAPER_NAME.AMBER_MAUVE]
    const awayPatch = composeGradientWallpaperPatch(
      { type: WALLPAPER_TYPE.GRADIENT, gradient: originalGradient },
      GRADIENT_WALLPAPER_NAME.STONE_GREEN,
    )
    const backPatch = composeGradientWallpaperPatch(
      { type: WALLPAPER_TYPE.GRADIENT, gradient: awayPatch.gradient },
      GRADIENT_WALLPAPER_NAME.AMBER_MAUVE,
    )

    expect(backPatch.gradient).toStrictEqual(originalGradient)
    expect(backPatch.gradient).not.toHaveProperty('stops')
  })
})

describe('requiresWallpaperExport', () => {
  const uploadState = (effect = {}): TWallpaperThemeState =>
    ({
      type: WALLPAPER_TYPE.UPLOAD,
      source: 'upload',
      customWallpaper: null,
      assetPublicRef: 'asset-1',
      staticAssetPublicRef: null,
      pattern: {
        enabled: true,
        id: '01',
        intensity: 50,
        tone: WALLPAPER_PATTERN_TONE.DARK,
      },
      texture: {
        enabled: false,
        type: WALLPAPER_TEXTURE.NOISE,
        intensity: 0,
        params: {},
      },
      effect: {
        blurIntensity: 0,
        brightness: 100,
        saturation: 100,
        ...effect,
      },
      gradient: null,
      contentShadow: { enabled: false },
    }) as TWallpaperThemeState

  it('does not export an upload solely because its pattern is enabled', () => {
    expect(requiresWallpaperExport(uploadState())).toBe(false)
  })

  it('exports an upload when a raster effect changes its pixels', () => {
    expect(requiresWallpaperExport(uploadState({ brightness: 90 }))).toBe(true)
  })

  it('always exports recipe-based wallpapers', () => {
    expect(requiresWallpaperExport({ ...uploadState(), type: WALLPAPER_TYPE.GRADIENT })).toBe(true)
  })
})

describe('serializeWallpaperPatch', () => {
  it('canonicalizes signed gradient angles before persistence', () => {
    const serialized = serializeWallpaperPatch({
      light: {
        gradient: {
          version: 2,
          renderer: GRADIENT_RENDERER.LINEAR,
          preset: 'amber_mauve',
          colors: ['#FBEFDE', '#D8B9E3'],
          angle: -90,
          spread: 52,
        },
      },
    })

    expect(JSON.parse((serialized.light as Record<string, string>).gradient)).toMatchObject({
      angle: 270,
    })
  })

  it('encodes every Json input field as a GraphQL Json scalar string', () => {
    const serialized = serializeWallpaperPatch({
      light: {
        pattern: { enabled: true, id: '01', intensity: 50, tone: 'dark' },
        contentShadow: { enabled: false },
        effect: { blurIntensity: 0, brightness: 100, saturation: 100 },
        texture: { enabled: false, type: 'noise', intensity: 0, params: {} },
      },
    })
    const light = serialized.light as Record<string, string>

    expect(JSON.parse(light.pattern)).toMatchObject({ id: '01' })
    expect(JSON.parse(light.contentShadow)).toEqual({ enabled: false })
    expect(JSON.parse(light.effect)).toMatchObject({ brightness: 100 })
    expect(JSON.parse(light.texture)).toMatchObject({ type: 'noise' })
  })
})
