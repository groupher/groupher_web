import type { TPublishedWallpaper } from '~/spec'

import { getStaticWallpaperStyle } from './style'

const branch = (prefix: string) => ({
  wide: { url: `https://example.com/${prefix}-wide.webp`, width: 1920, height: 1080 },
  desktop: { url: `https://example.com/${prefix}-desktop.webp`, width: 1440, height: 900 },
  tablet: { url: `https://example.com/${prefix}-tablet.webp`, width: 1024, height: 768 },
  phone: { url: `https://example.com/${prefix}-phone.webp`, width: 768, height: 1024 },
})

const wallpaper = (light: TPublishedWallpaper['light'], dark: TPublishedWallpaper['dark']) => ({
  version: 1,
  light,
  dark,
})

describe('getStaticWallpaperStyle', () => {
  it('paints only the light branch when dark is absent', () => {
    const style = getStaticWallpaperStyle(wallpaper(branch('light'), null))

    expect(style['--wallpaper-light-wide']).toContain('light-wide.webp')
    expect(style['--wallpaper-dark-wide']).toBeUndefined()
  })

  it('paints only the dark branch when light is absent', () => {
    const style = getStaticWallpaperStyle(wallpaper(null, branch('dark')))

    expect(style['--wallpaper-light-wide']).toBeUndefined()
    expect(style['--wallpaper-dark-wide']).toContain('dark-wide.webp')
  })

  it('does not paint either branch when both are nil', () => {
    const style = getStaticWallpaperStyle(wallpaper(null, null))

    expect(Object.values(style).every((value) => value === undefined)).toBe(true)
    expect(Object.values(style).some((value) => String(value).includes('url('))).toBe(false)
  })

  it('treats version zero as an uninitialized wallpaper object', () => {
    const style = getStaticWallpaperStyle({ version: 0, light: null, dark: null })

    expect(Object.values(style).every((value) => value === undefined)).toBe(true)
  })
})
