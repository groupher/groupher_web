import type { TWallpaper, TWallpaperType, TWallpaperGradientDir } from '@/spec'

export type TWallpaperData = {
  wallpaper: string
  gradientWallpapers: Record<string, TWallpaper>
  patternWallpapers: Record<string, TWallpaper>
  wallpaperType: TWallpaperType
  hasPattern: boolean
  hasBlur: boolean
  hasShadow: boolean
  direction: TWallpaperGradientDir
}

export type TTab = 'buildin' | 'custom'
