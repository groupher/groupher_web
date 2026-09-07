import fixture from '@groupher/contracts/fixtures/wallpaper-profile-matrix-v1.json'
import type { TWallpaperProfile } from '@groupher/contracts/wallpaper'
import { describe, expect, it } from 'vitest'

describe('Wallpaper profile matrix contract', () => {
  it('uses unambiguous profile and variant keys at the Assets Hub boundary', () => {
    expect(fixture.profileVersion).toBe(1)

    for (const profile of fixture.profiles as Array<{
      darkVariantKey: string
      format: string
      key: TWallpaperProfile
      lightVariantKey: string
    }>) {
      expect(profile.key).toMatch(/^[a-z][a-z0-9_]*$/)
      expect(profile.key).not.toContain('-')
      expect(profile.format).toBe('webp')
      expect(profile.lightVariantKey).toBe(`light-${profile.key}`)
      expect(profile.darkVariantKey).toBe(`dark-${profile.key}`)
    }
  })
})
