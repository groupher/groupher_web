import type { TSizeTSM } from '@/spec'
import SIZE from '@/const/size'

export const getIconSize = (size: TSizeTSM): number => {
  switch (size) {
    case SIZE.MEDIUM: {
      return 10
    }

    default: {
      return 10
    }
  }
}

export const getDotMargin = (size: TSizeTSM): number => {
  switch (size) {
    case SIZE.MEDIUM: {
      return 6
    }

    default: {
      return 4
    }
  }
}

export const getHashMargin = (size: TSizeTSM): number => {
  switch (size) {
    case SIZE.MEDIUM: {
      return 3
    }

    default: {
      return 1
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
