import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

import type { TFlatThemeKey } from '~/utils/themes/skins'
import useTheme from '~/hooks/useTheme'
import useAvatarLayout from '~/hooks/useAvatarLayout'

import THEME from '~/const/theme'

// usefull tips from: https://www.youtube.com/watch?v=re2JFITR7TI
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

type TRet = {
  cn: (...inputs: ClassValue[]) => string
  fg: (key: TFlatThemeKey) => string
  bg: (key: TFlatThemeKey) => string
  fill: (key: TFlatThemeKey) => string
  avatar: () => string
}

export default (): TRet => {
  const { theme: curTheme } = useTheme()
  const { isSquare: isAvatarSquare } = useAvatarLayout()

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

  const avatar = () => {
    return isAvatarSquare ? 'rounded-md' : 'rounded-full'
  }

  // TODO: rainbox
  // const textColor = clsx(`text-rainbow-${color}`)
  // const bgColor = clsx(`bg-${color}`)

  return {
    fg,
    bg,
    fill,
    avatar,
    cn,
  }
}
