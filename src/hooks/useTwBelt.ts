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
  global: (className: string) => string
  fg: (key: TFlatThemeKey) => string
  bg: (key: TFlatThemeKey) => string
  fill: (key: TFlatThemeKey) => string
  br: (key: TFlatThemeKey) => string
  avatar: () => string
  // before: (rules: string) => string
  // after: (rules: string) => string
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

  const global = (className: string) => (curTheme === THEME.LIGHT ? className : `${className}-dark`)
  const fg = (key: TFlatThemeKey) => theme(key, 'text')
  const bg = (key: TFlatThemeKey) => theme(key, 'bg')
  const fill = (key: TFlatThemeKey) => theme(key, 'fill')
  const br = (key: TFlatThemeKey) => theme(key, 'border')

  /**
   * before & after is not working cause it's gen dynamic, need add those into safelist
   * but those are too many & dynamic, no need
   */
  // const _parsePseudo = (rules, type: 'before' | 'after') => {
  //   return clsx(
  //     rules
  //       .split(' ')
  //       .map((rule: string) => `${type}:${rule}`)
  //       .join(' '),
  //   )
  // }

  // const before = (rules: string): string => _parsePseudo(rules, 'before')
  // const after = (rules: string): string => _parsePseudo(rules, 'after')

  const avatar = () => (isAvatarSquare ? 'rounded-md' : 'rounded-full')

  // TODO: rainbox
  // const textColor = clsx(`text-rainbow-${color}`)
  // const bgColor = clsx(`bg-${color}`)

  return {
    cn,
    global,
    fg,
    bg,
    fill,
    br,
    avatar,
    // before,
    // after,
  }
}
