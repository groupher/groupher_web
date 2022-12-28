// import { theme } from '@/utils/css'

import type { TWallpaperGradientDir } from '@/spec'
import { GRADIENT_DIRECTION } from '@/constant'

import type { TImagePos, TImageCor, TLinearBorderPos } from '../spec'
import { IMAGE_POS, LINEAR_BORDER } from '../constant'

export const getImageCor = (pos: TImagePos): TImageCor => {
  const topOffset = 40
  const leftOffset = 40

  switch (pos) {
    case IMAGE_POS.TOP_LEFT: {
      return {
        top: `-${topOffset}px`,
        left: `-${leftOffset}px`,
      }
    }

    case IMAGE_POS.TOP_CENTER: {
      return {
        top: `-${topOffset}px`,
        left: 0,
      }
    }

    case IMAGE_POS.TOP_RIGHT: {
      return {
        top: `-${topOffset}px`,
        left: `${leftOffset}px`,
      }
    }

    case IMAGE_POS.CENTER_LEFT: {
      return {
        top: 0,
        left: `-${leftOffset}px`,
      }
    }

    case IMAGE_POS.CENTER_RIGHT: {
      return {
        top: 0,
        left: `${leftOffset}px`,
      }
    }

    case IMAGE_POS.BOTTOM_LEFT: {
      return {
        top: `${topOffset}px`,
        left: `-${leftOffset}px`,
      }
    }

    case IMAGE_POS.BOTTOM_CENTER: {
      return {
        top: `${topOffset}px`,
        left: 0,
      }
    }

    case IMAGE_POS.BOTTOM_RIGHT: {
      return {
        top: `${topOffset}px`,
        left: `${leftOffset}px`,
      }
    }

    // center
    default: {
      return {
        left: 0,
        top: 0,
      }
    }
  }
}

export const getLinearBorder = (pos: TLinearBorderPos, active = false): string => {
  const color = active ? '#333333' : '#dcd6ca' // light or dark

  switch (pos) {
    case LINEAR_BORDER.TOP_LEFT: {
      return `linear-gradient(transparent, transparent), 
      linear-gradient(to left top, transparent, transparent 62%, ${color})`
    }
    case LINEAR_BORDER.TOP_RIGHT: {
      return `linear-gradient(transparent, transparent),
      linear-gradient(to right top, transparent, transparent 62%, ${color});`
    }
    case LINEAR_BORDER.TOP_ALL: {
      return `linear-gradient(transparent, transparent),
      linear-gradient(to top, transparent, transparent 20%, ${color});`
    }
    case LINEAR_BORDER.BOTTOM_LEFT: {
      return `linear-gradient(transparent, transparent), 
      linear-gradient(to left bottom, transparent, transparent 62%, ${color});`
    }
    case LINEAR_BORDER.BOTTOM_RIGHT: {
      return `linear-gradient(transparent, transparent), 
      linear-gradient(to right bottom, transparent, transparent 62%, ${color});`
    }

    case LINEAR_BORDER.BOTTOM_ALL: {
      return `linear-gradient(transparent, transparent), 
      linear-gradient(to bottom, transparent, transparent 20%, ${color});`
    }
    case LINEAR_BORDER.LEFT_ALL: {
      return `linear-gradient(transparent, transparent), 
      linear-gradient(to left, transparent, transparent 20%, ${color});`
    }
    case LINEAR_BORDER.RIGHT_ALL: {
      return `linear-gradient(transparent, transparent),
      linear-gradient(to right, transparent, transparent 20%, ${color});`
    }
    case LINEAR_BORDER.NONE: {
      return 'none'
    }
    // all
    default: {
      return `linear-gradient(transparent, transparent),
      linear-gradient(to left, transparent, transparent, ${color});`
    }
  }
}

export const getBgGradientDirAngle = (dir: TWallpaperGradientDir): string => {
  switch (dir) {
    case GRADIENT_DIRECTION.TOP: {
      return '90deg'
    }
    case GRADIENT_DIRECTION.TOP_RIGHT: {
      return '135deg'
    }
    case GRADIENT_DIRECTION.RIGHT: {
      return '180deg'
    }
    case GRADIENT_DIRECTION.BOTTOM_RIGHT: {
      return '225deg'
    }
    case GRADIENT_DIRECTION.BOTTOM: {
      return '270deg'
    }
    case GRADIENT_DIRECTION.BOTTOM_LEFT: {
      return '315deg'
    }
    case GRADIENT_DIRECTION.LEFT: {
      return '0'
    }
    // TOP_LEFT
    default: {
      return '45deg'
    }
  }
}
