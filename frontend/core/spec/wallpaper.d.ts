import type { WALLPAPER_PATTERN_TONE, WALLPAPER_TYPE } from '~/const/wallpaper'
import type { TBgEffect, TBgPattern, TBgTexture } from '~/lib/bg'
import type { TGradientRecipe } from '~/lib/wallpaperMesh'

export type TWallpaperFmt = {
  effect: string
  background: string
}

export type TWallpaperGradientDir = string

export type TWallpaperGradient = {
  colors?: string[]
  hasPattern?: boolean
  direction?: TWallpaperGradientDir

  // Applied by dashboard wallpaper settings before parsing the render background.
  blurIntensity?: number
  brightness?: number
  saturation?: number
}

export type TWallpaperPic = {
  image?: string
  preview?: string
  /** Stable Assets Hub ref retained when the image is uploaded by the editor. */
  assetPublicRef?: string | null

  // Applied by dashboard wallpaper settings before parsing the render background.
  blurIntensity?: number
  brightness?: number
  saturation?: number
}

export type TWallpaper = TWallpaperGradient | TWallpaperPic

export type TWallpaperPattern = {
  id: string
  image: string
  preview: string
}

export type TCustomWallpaper = TWallpaper | null

export type TWallpaperType = WALLPAPER_TYPE

export type TWallpaperPatternTone = WALLPAPER_PATTERN_TONE

export type TGradientPalette = {
  key: string
  label: string
  colors: string[]
}

export type TGradientEffectInit = {
  angle: number
  spread: number
}

export type TWallpaperInfo = {
  customWallpaper?: TCustomWallpaper
  source: string
  wallpapers: Record<string, TWallpaper>
  gradientPalettes?: Record<string, TGradientPalette>
  gradientWallpapers?: Record<string, TGradientRecipe>

  changeWallpaper?: (source: string) => void
}

export type TWallpaperData = {
  source: string
  gradientPalettes: Record<string, TGradientPalette>
  gradientWallpapers: Record<string, TGradientRecipe>
  patternWallpapers: Record<string, TWallpaper>
  type: TWallpaperType
  pattern: TBgPattern
  texture: TBgTexture
  hasBlur: boolean
  contentShadow: {
    enabled: boolean
  }
  effect: TBgEffect
  gradient: TGradientRecipe | null
}

export type TWallpaperConfigData = {
  customWallpaper: TCustomWallpaper
  assetPublicRef?: string | null
  staticAssetPublicRef?: string | null
  source: string
  type: TWallpaperType
  pattern: TBgPattern
  texture: TBgTexture
  hasBlur?: boolean
  contentShadow: {
    enabled: boolean
  }
  effect: TBgEffect
  gradient: TGradientRecipe | null
}

export type TWallpaperConfig = {
  light: Partial<TWallpaperConfigData>
  dark: Partial<TWallpaperConfigData>
  staticRevision?: string | null
}

export type TStaticWallpaperAsset = {
  assetPublicRef: string
  url: string
}

export type TStaticWallpaper = {
  light: TStaticWallpaperAsset | null
  dark: TStaticWallpaperAsset | null
  revision: string
}

export type TParsedWallpaper = Partial<TWallpaperConfig> & {
  initWallpaper?: Partial<TWallpaperConfig>
  staticWallpaper?: TStaticWallpaper | null
}
