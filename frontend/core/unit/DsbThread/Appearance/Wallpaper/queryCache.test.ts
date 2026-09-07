import { updatePublishedWallpaperVersion } from './queryCache'

describe('updatePublishedWallpaperVersion', () => {
  it('updates only the version and preserves published images', () => {
    const current = {
      wallpaper: {
        version: 7,
        light: { wide: { height: 100, url: '/light.webp', width: 100 } },
        dark: null,
      },
      light: {},
      dark: {},
    }

    expect(updatePublishedWallpaperVersion(current, 8)).toEqual({
      ...current,
      wallpaper: { ...current.wallpaper, version: 8 },
    })
  })

  it('leaves an absent or incomplete published payload unchanged', () => {
    expect(updatePublishedWallpaperVersion(undefined, 8)).toBeUndefined()
    expect(updatePublishedWallpaperVersion({ light: {}, dark: {} }, 8)).toEqual({
      light: {},
      dark: {},
    })
  })
})
