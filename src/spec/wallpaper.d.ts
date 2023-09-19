export type TWallpaperFmt = {
  effect: string
  background: string
}

export type TWallpaperGradientDir =
  | 'top'
  | 'top right'
  | 'right'
  | 'bottom right'
  | 'bottom'
  | 'bottom left'
  | 'left'
  | 'top left'

export type TWallpaperGradient = {
  colors?: string[]
  hasPattern?: boolean
  direction?: TWallpaperGradientDir

  // common
  hasBlur?: boolean
  hasShadow?: boolean
}

export type TWallpaperPic = {
  bgImage?: string
  bgSize?: string // 'contain' | 'cover' | 'auto'

  // common
  hasBlur?: boolean
  hasShadow?: boolean
}

export type TWallpaper = TWallpaperGradient | TWallpaperPic

export type TCustomWallpaper = TWallpaper | null

export type TWallpaperType = 'pattern' | 'gradient' | 'custom_gradient' | 'upload' | 'none'

export type TWallpaperInfo = {
  customWallpaper: TCustomWallpaper
  wallpaper: string
  wallpapers: Record<string, TWallpaper>
  hasShadow?: boolean
}
