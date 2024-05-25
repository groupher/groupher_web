import { theme, rainbow } from '@/css'
import SIZE from '@/const/size'

import type { TColorName, TTheme } from '@/spec'

export const getActiveBackground = (dimOnActive: boolean, primaryColor: TColorName): TTheme => {
  return dimOnActive ? theme('divider') : rainbow(primaryColor, 'button.primary')
}

export const getLabelColor = (checked: boolean, dimOnActive: boolean): TTheme => {
  if (dimOnActive) return theme('article.title')

  return checked ? theme('button.fg') : theme('article.title')
}

export const getLabelFontsize = (size: string): string => {
  switch (size) {
    case SIZE.SMALL: {
      return '12px'
    }

    default: {
      return '15px'
    }
  }
}

export const getRadioBoxSize = (size: string): string => {
  switch (size) {
    case SIZE.SMALL: {
      return '12px'
    }

    default: {
      return '13px'
    }
  }
}

export const getRadioBoxTop = (size: string): string => {
  switch (size) {
    case SIZE.SMALL: {
      return '5px'
    }

    default: {
      return '6px'
    }
  }
}

export const getRadioBoxLeft = (size: string): string => {
  switch (size) {
    case SIZE.SMALL: {
      return '7px'
    }

    default: {
      return '2px'
    }
  }
}
