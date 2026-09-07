import { WALLPAPER_TYPE } from '~/const/wallpaper'
import type { TPublishedWallpaper } from '~/spec'
import type { TWallpaperThemeState } from '~/stores/wallpaper/spec'

const CONTENT_SURFACE_BACKGROUND = 'var(--preview-page-bg, var(--color-pageBg))'

/** Returns whether the published branch can provide a Wallpaper image layer. */
export const hasPublishedWallpaper = (
  wallpaper: TPublishedWallpaper | null | undefined,
  theme: 'light' | 'dark',
): boolean => {
  return Boolean(wallpaper?.[theme])
}

/** Returns whether the current editor draft should provide a Wallpaper layer. */
export const hasPreviewWallpaper = (settings: Pick<TWallpaperThemeState, 'type'>): boolean => {
  return settings.type !== WALLPAPER_TYPE.NONE
}

/** Keeps the Content surface color and blur disabled together when no Wallpaper exists. */
export const getContentSurfaceRenderProps = (hasWallpaper: boolean) => ({
  className: hasWallpaper ? 'backdrop-blur-2xl' : '',
  backgroundColor: hasWallpaper ? CONTENT_SURFACE_BACKGROUND : 'transparent',
})
