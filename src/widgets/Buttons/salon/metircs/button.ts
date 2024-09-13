import SIZE from '~/const/size'

export const getHeight = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return 'auto'
    }

    case SIZE.SMALL: {
      return 'h-6'
    }

    default: {
      return 'h-8'
    }
  }
}

export const getRouned = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return 'rounded-md'
    }

    case SIZE.SMALL: {
      return 'rounded-lg'
    }

    default: {
      return 'rounded-xl'
    }
  }
}

export const getPadding = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return 'py-0.5 px-0.5'
    }

    case SIZE.SMALL: {
      return 'py-1 px-1'
    }

    default: {
      return 'py-1.5 px-3'
    }
  }
}

export const getFontSize = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return 'text-xs'
    }

    case SIZE.SMALL: {
      return 'text-xs'
    }

    default: {
      return 'text-sm'
    }
  }
}
