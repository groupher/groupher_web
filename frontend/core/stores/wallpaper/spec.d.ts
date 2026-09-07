import type { TBgConfig } from '~/lib/bg'

/** Wallpaper-only working copy; Dashboard content shadow has a separate store/lane. */
export type TWallpaperThemeState = TBgConfig

export type TWallpaperState = {
  light: TWallpaperThemeState
  dark: TWallpaperThemeState
}

export type TWallpaperPatch = {
  light?: Partial<TWallpaperThemeState>
  dark?: Partial<TWallpaperThemeState>
}

export type TStore = TWallpaperState & {
  original: TWallpaperState
  // actions
  commit: (
    patch: Partial<
      Omit<TStore, 'light' | 'dark' | 'commit' | 'acceptSubmitted' | 'reconcileConfirmed'>
    > &
      TWallpaperPatch,
  ) => void
  acceptSubmitted: (submitted: TWallpaperPatch) => void
  reconcileConfirmed: (confirmed: TInit) => void
}

export type TInit = {
  light?: Partial<TWallpaperThemeState> | null
  dark?: Partial<TWallpaperThemeState> | null
  wallpaper?: import('~/spec').TPublishedWallpaper | null
}
