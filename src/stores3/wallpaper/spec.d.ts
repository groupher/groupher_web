import type { TCustomWallpaper, TWallpaper, TWallpaperType, TWallpaperGradientDir } from '@/spec'

// customWallpaper, wallpaper, wallpapers, hasShadow, gradientWallpapers, changeWallpaper
export type TStore = {
  customWallpaper: TCustomWallpaper
  customColorValue: strign
  wallpaper: string
  wallpaperType: TWallpaperType

  hasBlur: boolean
  hasPattern: boolean
  hasShadow: boolean

  // TODO: move out
  // wallpapers: Record<string, TWallpaper>
  // TODO: move out
  // gradientWallpapers: Record<string, TWallpaper>

  direction: TWallpaperGradientDir
  bgSize: string
  uploadBgImage: string

  // actions
  commit: (patch: Partial<TStore>) => void
}

export type TInitState = Partial<TStore>
