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
  hasBlur?: boolean
  direction?: TWallpaperGradientDir

  // this is for content on the wallpaper
  hasShadow?: boolean
}

export type TWallpaperPic = {
  bgImage?: string
  bgColor?: string
  bgSize?: string // 'contain' | 'cover' | 'auto'
  hasBlur?: boolean

  // this is for content on the wallpaper
  hasShadow?: boolean
}

export type TWallpaper = TWallpaperGradient | TWallpaperPic

export type TCustomWallpaper = TWallpaper | null

export type TWallpaperType = 'pattern' | 'gradient' | 'custom' | 'none'

export type TWallpaperInfo = {
  customWallpaper: TCustomWallpaper
  wallpaper: string
  wallpapers: Record<string, TWallpaper>

  hasShadow?: boolean
}
