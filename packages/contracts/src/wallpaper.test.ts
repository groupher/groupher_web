import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { canonicalGeneratedImageManifestV1, type TGeneratedImageManifestEntry } from './wallpaper'

const fixture = JSON.parse(
  readFileSync(new URL('../fixtures/wallpaper-manifest-digest-v1.json', import.meta.url), 'utf8'),
) as {
  canonical: string
  manifest: TGeneratedImageManifestEntry[]
}

const settingsFixture = JSON.parse(
  readFileSync(new URL('../fixtures/wallpaper-settings-v1.json', import.meta.url), 'utf8'),
) as {
  gradientCustomWallpaper: {
    transport: Record<string, unknown>
  }
  mesh: { transport: Record<string, unknown> }
  meshLiquid: { transport: Record<string, unknown> }
  none: { transport: Record<string, unknown> }
  picture: {
    domain: {
      customWallpaper: { assetPublicRef: string; config: Record<string, unknown> }
    }
  }
  radial: { transport: Record<string, unknown> }
  transport: Record<string, unknown>
}

describe('Wallpaper manifest contract', () => {
  it('matches the shared v1 canonical golden bytes', () => {
    expect(canonicalGeneratedImageManifestV1(fixture.manifest)).toBe(fixture.canonical)
  })

  it('keeps uploaded picture refs outside the config leaf', () => {
    expect(settingsFixture.picture.domain.customWallpaper.assetPublicRef).toBe('asset_picture')
    expect(settingsFixture.picture.domain.customWallpaper.config).not.toHaveProperty(
      'assetPublicRef',
    )
  })

  it('keeps every settings codec branch in the shared fixture', () => {
    expect(settingsFixture.none.transport.type).toBe('NONE')
    expect(settingsFixture.transport.renderConfig).toMatchObject({
      gradient: { renderer: 'linear', version: 2 },
    })
    expect(settingsFixture.radial.transport.renderConfig).toMatchObject({
      gradient: { renderer: 'radial', version: 2 },
    })
    expect(settingsFixture.mesh.transport.renderConfig).toMatchObject({
      gradient: { renderer: 'flow', version: 2 },
    })
    expect(settingsFixture.meshLiquid.transport.renderConfig).toMatchObject({
      gradient: { renderer: 'liquid', version: 2 },
    })
    expect(settingsFixture.gradientCustomWallpaper.transport.customWallpaper).toMatchObject({
      type: 'GRADIENT',
      assetPublicRef: null,
    })
  })
})
