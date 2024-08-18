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
      return 'h-9'
    }
  }
}

export const getRouned = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return 'rounded-md'
    }

    default: {
      return 'rounded-xl'
    }
  }
}

export const getPadding = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return '0 4px'
    }

    case SIZE.SMALL: {
      return '0 7px'
    }

    default: {
      return 'py-1.5 px-3.5'
    }
  }
}

export const getFontSize = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return 'text-xs'
    }

    default: {
      return 'text-sm'
    }
  }
}
