import type { TSizeTSM } from '@/spec'
import SIZE from '@/constant/size'

export const getIconSize = (size: TSizeTSM): number => {
  switch (size) {
    case SIZE.MEDIUM: {
      return 12
    }

    default: {
      return 10
    }
  }
}

export const getDotMargin = (size: TSizeTSM): string => {
  switch (size) {
    case SIZE.MEDIUM: {
      return '6px'
    }

    default: {
      return '4px'
    }
  }
}

export const getDotSize = (size: TSizeTSM): number => {
  switch (size) {
    case SIZE.MEDIUM: {
      return 8
    }

    default: {
      return 6
    }
  }
}

export const getTitleSize = (size: TSizeTSM): string => {
  switch (size) {
    case SIZE.SMALL: {
      return '12px'
    }

    case SIZE.MEDIUM: {
      return '13px'
    }

    default: {
      return '11px'
    }
  }
}
