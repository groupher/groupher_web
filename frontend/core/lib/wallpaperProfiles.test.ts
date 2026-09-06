import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import fixture from '@groupher/contracts/fixtures/wallpaper-profile-matrix-v1.json'

import {
  WALLPAPER_PROFILE_SPECS,
  WALLPAPER_PROFILE_VERSION,
  resolveWallpaperProfile,
  wallpaperVariantSpecs,
  resolveWallpaperFraming,
} from './wallpaperProfiles'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const wallpaperCss = fs
  .readFileSync(path.join(__dirname, '../tailwind/common/utils.css'), 'utf8')
  .replace(/\s+/g, ' ')

const staticWallpaperRule = (theme: 'light' | 'dark', profile: string): string => {
  const selector = theme === 'dark' ? "[data-theme='dark'] .static-wallpaper" : '.static-wallpaper'
  return `${selector} { background-image: var(--wallpaper-${theme}-${profile}, none); }`
}

describe('wallpaper profile contract', () => {
  it('defines one independent target for every initial profile', () => {
    expect(WALLPAPER_PROFILE_VERSION).toBe(1)
    expect(WALLPAPER_PROFILE_SPECS.map(({ key }) => key)).toEqual([
      'wide',
      'desktop',
      'tablet',
      'phone',
    ])
    expect(wallpaperVariantSpecs('dark')).toMatchObject([
      { key: 'dark-wide', profile: 'wide' },
      { key: 'dark-desktop', profile: 'desktop' },
      { key: 'dark-tablet', profile: 'tablet' },
      { key: 'dark-phone', profile: 'phone' },
    ])
  })

  it('matches the shared cross-language profile fixture', () => {
    expect(WALLPAPER_PROFILE_VERSION).toBe(fixture.profileVersion)
    expect(
      WALLPAPER_PROFILE_SPECS.map(({ key, logicalHeight, logicalWidth }) => ({
        darkVariantKey: `dark-${key}`,
        format: 'webp',
        height: logicalHeight,
        key,
        lightVariantKey: `light-${key}`,
        logicalHeight,
        logicalWidth,
        width: logicalWidth,
      })),
    ).toEqual(fixture.profiles)
  })

  it('uses normalized center-cover framing when no override exists', () => {
    expect(resolveWallpaperFraming()).toEqual({
      mode: 'focal',
      point: { x: 0.5, y: 0.5 },
      zoom: 1,
    })
  })

  it('resolves the client profile at the CSS contract boundaries', () => {
    expect(resolveWallpaperProfile(1720, 1250)).toBe('desktop')
    expect(resolveWallpaperProfile(1800, 1000)).toBe('wide')
    expect(resolveWallpaperProfile(1440, 900)).toBe('desktop')
    expect(resolveWallpaperProfile(1024, 640)).toBe('desktop')
    expect(resolveWallpaperProfile(1024, 639)).toBe('wide')
    expect(resolveWallpaperProfile(800, 1200)).toBe('tablet')
    expect(resolveWallpaperProfile(390, 844)).toBe('phone')
  })

  it('keeps the StaticWallpaper CSS cascade aligned with the profile specs', () => {
    expect(wallpaperCss).toContain(staticWallpaperRule('light', 'wide'))
    expect(wallpaperCss).toContain(staticWallpaperRule('dark', 'wide'))

    for (const { key, mediaQuery } of WALLPAPER_PROFILE_SPECS) {
      const mediaPrefix = `@media ${mediaQuery} {`
      const lightRule = `${mediaPrefix} ${staticWallpaperRule('light', key)}`
      const darkRule = `${mediaPrefix} ${staticWallpaperRule('dark', key)}`

      expect(wallpaperCss).toContain(lightRule)
      expect(wallpaperCss).toContain(darkRule)
    }

    const wideQuery = WALLPAPER_PROFILE_SPECS.find(({ key }) => key === 'wide')?.mediaQuery
    const desktopQuery = WALLPAPER_PROFILE_SPECS.find(({ key }) => key === 'desktop')?.mediaQuery
    const wideRuleIndex = wallpaperCss.indexOf(
      `@media ${wideQuery} { ${staticWallpaperRule('light', 'wide')}`,
    )
    const desktopRuleIndex = wallpaperCss.indexOf(
      `@media ${desktopQuery} { ${staticWallpaperRule('light', 'desktop')}`,
    )

    expect(wideRuleIndex).toBeGreaterThan(-1)
    expect(desktopRuleIndex).toBeGreaterThan(wideRuleIndex)
  })
})
