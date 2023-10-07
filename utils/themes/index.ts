/*
 * theme desc
 * TODO: add README in this folder to show some snapshot
 * 参考: http://enrmarc.github.io/atom-theme-gallery/
 * slackUI: https://atom.io/themes/slack-ui
 * Github: ...
 * gruvbox: https://atom.io/themes/gruvbox-syntax
 * Spacegray: https://atom.io/themes/spacegray-dark-neue-syntax
 * DuoTone Dark: https://atom.io/themes/duotone-dark-forest-syntax
 * DuoTone Dark2: https://atom.io/themes/duotone-dark-earth-syntax
 * Earthsung https://atom.io/themes/earthsung-by-jackson-syntax
 */

import { map, path, split } from 'ramda'

import type { TColorName, TTheme } from '@/spec'
import { COLORS, COLOR_NAME } from '@/constant/colors'

import { camelize } from '@/fmt'

import type { TFlatThemeKey } from './skins'
import skinsData from './skins'

export const themeSkins = { ...skinsData }

// cover color of a theme
// @ts-ignore
export const themeCoverMap = map(path(['cover']), themeSkins)
// the "T" color in themeSelector
// @ts-ignore
export const themeCoverIndexMap = map(path(['coverIndex']), themeSkins)

// curried shorthand for style-components
export const theme = (themeKey: TFlatThemeKey): TTheme =>
  path(['theme', ...split('.', themeKey)]) || 'wheat'

/**
 * for primary color component
 */
export const primaryTheme = (primaryColor: TColorName, themeKey = 'primary'): string => {
  if (primaryColor === COLOR_NAME.BLACK) {
    return theme(themeKey as TFlatThemeKey)
  }

  return COLORS[primaryColor]
}

export const primaryLink = (primaryColor: TColorName): string => {
  if (primaryColor === COLOR_NAME.BLACK) {
    return theme('link')
  }

  return COLORS[primaryColor]
}

export const primaryLightTheme = (primaryColor: TColorName): string => {
  if (primaryColor === COLOR_NAME.BLACK) {
    return theme('hoverBg')
  }

  return `baseColor.${camelize(primaryColor)}Bg` as TFlatThemeKey
}

export const baseColorTheme = (color: TColorName | string): string => {
  return theme(`baseColor.${camelize(color)}` as TFlatThemeKey)
}

export const baseColorBgTheme = (color: TColorName | string): string => {
  return theme(`baseColor.${camelize(color)}Bg` as TFlatThemeKey)
}

export { default as themeMeta } from './theme_meta'
