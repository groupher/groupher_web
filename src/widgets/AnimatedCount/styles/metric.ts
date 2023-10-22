import type { TSize } from '@/spec'
import SIZE from '@/constant/size'

export const getFontSize = (size: TSize): number => {
  switch (size) {
    case SIZE.TINY: {
      return 13
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
