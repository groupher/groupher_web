import type { TSize } from '@/spec'
import { SIZE } from '@/constant'

import { theme } from '@/utils/css'

export const getFontSize = (size: TSize): number => {
  switch (size) {
    case SIZE.TINY: {
      return 13
    }
    case SIZE.SMALL: {
      return 15
    }
    case SIZE.MEDIUM: {
      return 16
    }
    case SIZE.LARGE: {
      return 23
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

export const getCountColor = ($active: boolean, count: number): string => {
  if ($active) return '#139C9E'
  if (count === 0) return theme('article.digest')
  if (count >= 5) return theme('article.info')

  return theme('article.info')
}
