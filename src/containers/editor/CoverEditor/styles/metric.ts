import type { TImagePos, TImageCor } from '../spec'

import { IMAGE_POS } from '../constant'

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

export const holder = 1
