import SIZE from '@/constant/size'
import { theme, primaryTheme } from '@/css'

import type { TColorName, TTheme } from '@/spec'

export const getColor = (ghost: boolean, disabled: boolean): TTheme => {
  if (ghost) {
    return theme('button.primary')
  }

  if (disabled) {
    return theme('button.disabledFg')
  }

  return theme('button.fg')
}

export const getBackgroundColor = (
  primaryColor: TColorName,
  ghost: boolean,
  disabled: boolean,
  hover = false,
): TTheme => {
  if (ghost) {
    return 'transparent'
  }
  if (disabled) {
    return theme('divider') // TODO:  same as dimOnIdle background
  }

  return hover ? theme('button.hoverBg') : primaryTheme(primaryColor)
}

export const getBorderColor = (
  primaryColor: TColorName,
  noBorder: boolean,
  disabled: boolean,
  ghost: boolean,
  hover = false,
): TTheme => {
  if (noBorder) {
    return 'transparent'
  }
  if (disabled) {
    return theme('divider') // TODO:  same as dimOnIdle background
  }

  if (ghost) {
    return hover ? theme('button.primary') : theme('button.ghostBorder')
  }

  return hover ? theme('button.hoverBg') : primaryTheme(primaryColor)
}

export const getHeight = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return 'auto'
    }

    case SIZE.SMALL: {
      return '24px'
    }

    default: {
      return '32px'
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
      return '4px 15px'
    }
  }
}

export const getFontSize = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return '11px'
    }

    case SIZE.MEDIUM: {
      return '15px'
    }

    case SIZE.SMALL: {
      return '12px'
    }

    default: {
      return '16px'
    }
  }
}

export const getLineHeight = (size: string): string => {
  switch (size) {
    case SIZE.TINY: {
      return '12px'
    }

    case SIZE.SMALL: {
      return '12px'
    }

    default: {
      return '12px'
    }
  }
}
