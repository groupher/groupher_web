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

import type { TColor, TColorName, TTheme } from '@/spec'
import { COLOR_NAME } from '@/constant/colors'

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

export const rainbowLink = (primaryColor: TColorName, rollbackForBlack = 'link'): string => {
  if (primaryColor === COLOR_NAME.BLACK) {
    return theme(rollbackForBlack as TFlatThemeKey)
  }

  return theme(`rainbow.${camelize(primaryColor)}` as TFlatThemeKey)
}

export const gradientBg = (color: TColorName | string): string => {
  return theme(`gradientBg.${camelize(color)}` as TFlatThemeKey)
}

/**
 * used for dynamic primary color or tag color based on pre-defined color names for each theme
 */
export const rainbow = (color: TColorName | string, darkThemeOverWriteKey = ''): string => {
  if (color === COLOR_NAME.BLACK) {
    return darkThemeOverWriteKey
      ? theme(`${darkThemeOverWriteKey as TFlatThemeKey}`)
      : theme(`rainbow.${camelize(color)}` as TFlatThemeKey)
  }

  return theme(`rainbow.${camelize(color)}` as TFlatThemeKey)
}

export const rainbowLight = (color: TColorName | string): string => {
  if (color === COLOR_NAME.BLACK) {
    return theme('hoverBg')
  }

  return theme(`rainbow.${camelize(color)}Bg` as TFlatThemeKey)
}

export { default as themeMeta } from './theme_meta'
