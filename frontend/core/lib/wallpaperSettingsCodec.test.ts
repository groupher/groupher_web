import settingsFixture from '@groupher/contracts/fixtures/wallpaper-settings-v1.json'

import { WALLPAPER_TYPE } from '~/const/wallpaper'
import { GRADIENT_RENDERER } from '~/lib/wallpaperMesh'
import type { TWallpaperThemeState } from '~/stores/wallpaper/spec'

import {
  decodeWallpaperSettings,
  encodeWallpaperSettings,
  normalizeWallpaperSettings,
} from './wallpaperSettingsCodec'

const decodeFixture = (value: unknown) =>
  decodeWallpaperSettings(value as Parameters<typeof decodeWallpaperSettings>[0])

const baseState = (patch: Partial<TWallpaperThemeState> = {}): TWallpaperThemeState => ({
  customWallpaper: null,
  source: 'amber_mauve',
  type: WALLPAPER_TYPE.GRADIENT,
  pattern: { enabled: false, id: '01', intensity: 0, tone: 'dark' },
  gradient: {
    version: 2,
    renderer: GRADIENT_RENDERER.LINEAR,
    preset: 'amber_mauve',
    colors: ['#FBEFDE', '#D8B9E3'],
    angle: -90,
    spread: 52,
  },
  effect: { blurIntensity: 0, brightness: 100, saturation: 100 },
  texture: { enabled: false, type: 'noise', intensity: 0, params: {} },
  ...patch,
})

describe('Wallpaper Settings codec', () => {
  it('normalizes NONE to its single canonical branch', () => {
    expect(
      normalizeWallpaperSettings(baseState({ source: '', type: WALLPAPER_TYPE.NONE })),
    ).toEqual({
      type: WALLPAPER_TYPE.NONE,
    })
  })

  it('round-trips a renderable settings envelope and normalizes angles', () => {
    const encoded = encodeWallpaperSettings(baseState())
    expect(encoded.type).toBe('GRADIENT')
    expect(JSON.parse(encoded.renderConfig ?? '{}').gradient).toMatchObject({ angle: 270 })
    expect(
      decodeWallpaperSettings({
        ...encoded,
        renderConfig: JSON.parse(encoded.renderConfig ?? '{}'),
      }),
    ).toMatchObject({
      source: 'amber_mauve',
      type: WALLPAPER_TYPE.GRADIENT,
      gradient: { angle: 270 },
    })
  })

  it('keeps a picture asset ref outside the config leaf', () => {
    const encoded = encodeWallpaperSettings(
      baseState({
        customWallpaper: {
          type: 'picture',
          image: 'https://example.com/wallpaper.webp',
          assetPublicRef: 'asset_picture',
        },
      }),
    )

    expect(encoded.customWallpaper).toEqual({
      assetPublicRef: 'asset_picture',
      config: '{"image":"https://example.com/wallpaper.webp"}',
      type: 'PICTURE',
    })
    expect(JSON.parse(encoded.customWallpaper?.config ?? '{}')).not.toHaveProperty('assetPublicRef')
  })

  it('accepts the shared picture fixture without moving its asset ref into config', () => {
    const decoded = decodeFixture(settingsFixture.picture.transport)

    expect(decoded.customWallpaper).toMatchObject({
      assetPublicRef: 'asset_picture',
      type: 'picture',
    })
    expect(decoded.customWallpaper).not.toHaveProperty('config.assetPublicRef')
  })

  it('accepts the shared linear, radial, mesh, and custom gradient fixtures', () => {
    expect(decodeFixture(settingsFixture.transport)).toMatchObject({
      gradient: { renderer: GRADIENT_RENDERER.LINEAR },
    })
    expect(decodeFixture(settingsFixture.radial.transport)).toMatchObject({
      gradient: {
        center: { x: 0.5, y: 0.5 },
        renderer: GRADIENT_RENDERER.RADIAL,
      },
    })
    expect(decodeFixture(settingsFixture.mesh.transport)).toMatchObject({
      gradient: { renderer: GRADIENT_RENDERER.FLOW, version: 2 },
    })
    expect(decodeFixture(settingsFixture.meshLiquid.transport)).toMatchObject({
      gradient: { renderer: GRADIENT_RENDERER.LIQUID, version: 2 },
    })
    expect(decodeFixture(settingsFixture.gradientCustomWallpaper.transport)).toMatchObject({
      customWallpaper: { type: 'gradient' },
    })
  })

  it('accepts the shared NONE fixture as the canonical branch', () => {
    expect(decodeFixture(settingsFixture.none.transport)).toEqual({ type: WALLPAPER_TYPE.NONE })
  })

  it('rejects an unknown settings schema version', () => {
    expect(() =>
      decodeWallpaperSettings({
        settingsSchemaVersion: 2,
        type: 'NONE',
        source: null,
        customWallpaper: null,
        renderConfig: null,
      }),
    ).toThrow('WALLPAPER_SETTINGS_UNSUPPORTED_VERSION')
  })

  it('rejects an incomplete render config', () => {
    const encoded = encodeWallpaperSettings(baseState())

    expect(() =>
      decodeWallpaperSettings({
        ...encoded,
        renderConfig: JSON.stringify({ contentShadow: { enabled: false } }),
      }),
    ).toThrow('WALLPAPER_SETTINGS_INVALID: renderConfig shape is invalid')
  })

  it('rejects unknown render config top-level fields', () => {
    const encoded = encodeWallpaperSettings(baseState())
    const renderConfig = JSON.parse(encoded.renderConfig ?? '{}')

    expect(() =>
      decodeWallpaperSettings({
        ...encoded,
        renderConfig: JSON.stringify({ ...renderConfig, legacyShadow: {} }),
      }),
    ).toThrow('WALLPAPER_SETTINGS_INVALID: renderConfig shape is invalid')
  })

  it('rejects a gradient recipe with fields from another renderer family', () => {
    const encoded = encodeWallpaperSettings(baseState())
    const renderConfig = JSON.parse(encoded.renderConfig ?? '{}')

    expect(() =>
      decodeWallpaperSettings({
        ...encoded,
        renderConfig: JSON.stringify({
          ...renderConfig,
          gradient: { ...renderConfig.gradient, center: { x: 0.5, y: 0.5 } },
        }),
      }),
    ).toThrow('WALLPAPER_SETTINGS_INVALID: renderConfig shape is invalid')
  })

  it('rejects a gradient recipe with an unsupported recipe version', () => {
    const encoded = encodeWallpaperSettings(baseState())
    const renderConfig = JSON.parse(encoded.renderConfig ?? '{}')

    expect(() =>
      decodeWallpaperSettings({
        ...encoded,
        renderConfig: JSON.stringify({
          ...renderConfig,
          gradient: { ...renderConfig.gradient, version: 1 },
        }),
      }),
    ).toThrow('WALLPAPER_SETTINGS_INVALID: renderConfig shape is invalid')
  })
})
