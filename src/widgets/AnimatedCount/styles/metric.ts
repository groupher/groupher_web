import type { TThemeMap, TColorName, TSize } from '~/spec'

import SIZE from '~/const/size'
import { COLOR_NAME } from '~/const/colors'

export const getFontSize = (size: TSize): number => {
  switch (size) {
    case SIZE.TINY: {
      return 13
    }
    case SIZE.MEDIUM: {
      return 15
    }
    case SIZE.LARGE: {
      return 17
    }
    case SIZE.HUGE: {
      return 26
    }
    default: {
      return 14
    }
  }
}

export const getFlipNumOffset = (size: TSize): number => {
  switch (size) {
    case SIZE.MEDIUM: {
      return 7
    }
    default: {
      return 6
    }
  }
}

export const getCountColor = (
  active: boolean,
  themeMap: TThemeMap,
  primaryColor: TColorName,
  count: number,
): string => {
  if (count === 0) return themeMap.article.digest

  if (primaryColor === COLOR_NAME.BLACK) {
    return themeMap.article.digest
  }

  return active ? themeMap.rainbow[primaryColor.toLowerCase()] : themeMap.article.title
}
