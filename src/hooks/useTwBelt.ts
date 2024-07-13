import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

import type { TFlatThemeKey } from '~/utils/themes/skins'
import useTheme from '~/hooks/useTheme'

import THEME from '~/const/theme'

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

type TWColorPrefix = 'bg' | 'text' | 'fill' | 'border' | 'placeholder' | 'ring' | 'ring-offset'

type TRet = {
  cn: (...inputs: ClassValue[]) => string
  theme: (key: TFlatThemeKey, prefix?: TWColorPrefix) => string
  fg: (key: TFlatThemeKey) => string
  bg: (key: TFlatThemeKey) => string
  fill: (key: TFlatThemeKey) => string
}

export default (): TRet => {
  const { theme: curTheme } = useTheme()
  /**
   * cover article.title -> article-title to match the tailwind csss varaible name
   */
  const theme = (key: TFlatThemeKey, prefix = 'bg') => {
    return curTheme === THEME.LIGHT
      ? `${prefix}-${key.replace(/\./g, '-')}`
      : `${prefix}-${key.replace(/\./g, '-')}-dark`
  }

  const fg = (key: TFlatThemeKey) => theme(key, 'text')
  const bg = (key: TFlatThemeKey) => theme(key, 'bg')
  const fill = (key: TFlatThemeKey) => theme(key, 'fill')

  // TODO: rainbox
  // const textColor = clsx(`text-rainbow-${color}`)
  // const bgColor = clsx(`bg-${color}`)

  return {
    theme,
    fg,
    bg,
    fill,
    cn,
  }
}
