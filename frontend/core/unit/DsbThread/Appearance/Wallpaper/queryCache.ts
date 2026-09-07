import type { TParsedWallpaper } from '~/spec'

/** Updates only the published version while preserving the cached image payload. */
export const updatePublishedWallpaperVersion = (
  current: TParsedWallpaper | undefined,
  version: number,
): TParsedWallpaper | undefined => {
  if (!current?.wallpaper) return current

  return {
    ...current,
    wallpaper: { ...current.wallpaper, version },
  }
}
