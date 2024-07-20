import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

import type { TColorName } from '~/spec'
import type { TFlatThemeKey } from '~/utils/themes/skins'

import { camelize } from '~/fmt'

import useTheme from '~/hooks/useTheme'
import useAvatarLayout from '~/hooks/useAvatarLayout'
import usePrimaryColor from '~/hooks/usePrimaryColor'

import THEME from '~/const/theme'

type TColorPrefix = 'fg' | 'bg'

/**
 * Prevents output of unnecessary Tailwind classes and merges classes.
 * usefull tips from: https://www.youtube.com/watch?v=re2JFITR7TI
 *
 * @param inputs - Any number of class names or class name arrays.
 * @returns A string of merged class names.
 */
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

type TRet = {
  cn: (...inputs: ClassValue[]) => string
  global: (className: string) => string
  fg: (key: TFlatThemeKey) => string
  bg: (key: TFlatThemeKey) => string
  fill: (key: TFlatThemeKey) => string
  br: (key: TFlatThemeKey) => string
  rainbow: (color: TColorName, prefix?: TColorPrefix) => string
  primary: (prefix?: TColorPrefix) => string
  avatar: () => string
}

/**
 * NOTE: the classNams returned from here, must me declared in the tailwind.config's safelist
 * even you return static strings, cauze those are consided as dynamic, and tailwind will not know them
 */
export default (): TRet => {
  const { theme: curTheme } = useTheme()
  const { isSquare: isAvatarSquare } = useAvatarLayout()

  const primaryColor = usePrimaryColor()
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

  const rainbow = (color: TColorName, prefix: 'fg'): string => {
    const prefix$ = prefix === 'fg' ? 'text-rainbow' : `${prefix}-rainbow`
    const color$ = camelize(color)

    return curTheme === THEME.LIGHT ? `${prefix$}-${color$}` : `${prefix$}-${color$}-dark`
  }

  const primary = (prefix?: 'fg'): string => rainbow(primaryColor, prefix)

  const avatar = () => (isAvatarSquare ? 'rounded-md' : 'circle')

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
    rainbow,
    primary,
    avatar,
  }
}
