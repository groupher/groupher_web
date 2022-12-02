import type { TSize } from '@/spec'
import { SIZE } from '@/constant'

import { theme } from '@/utils/css'

export const getFontSize = (size: TSize): number => {
  switch (size) {
    case SIZE.TINY: {
      return 13
    }
    case SIZE.MEDIUM: {
      return 18
    }
    case SIZE.LARGE: {
      return 23
    }
    default: {
      return 15
    }
  }
}

export const getCountColor = ($active: boolean, count: number): string => {
  if ($active) return '#139C9E'
  if (count === 0) return theme('article.digest')
  if (count >= 5) return theme('article.info')

  return theme('article.info')
}
