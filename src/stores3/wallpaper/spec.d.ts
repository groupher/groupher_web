import type { TCustomWallpaper, TWallpaper, TWallpaperType } from '@/spec'

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

  direction: string
  bgSize: string
  uploadBgImage: string

  // actions, should be in wallpaper editor
  // changeWallpaper: (wallpaper: string) => void
}

export type TInitState = Partial<TStore>
