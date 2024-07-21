import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

import type { TColorName, TSpace } from '~/spec'
import type { TFlatThemeKey } from '~/utils/themes/skins'

import { camelize } from '~/fmt'

import useTheme from '~/hooks/useTheme'
import useAvatarLayout from '~/hooks/useAvatarLayout'
import usePrimaryColor from '~/hooks/usePrimaryColor'

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
  zise: (unit: number) => string
  margin: (spacing: TSpace) => string
  avatar: () => string
}

/**
 * NOTE: the classNams returned from here, must me declared in the tailwind.config's safelist
 * even you return static strings, cauze those are consided as dynamic, and tailwind will not know them
 */
export default (): TRet => {
  const { isLightTheme } = useTheme()
  const { isSquare: isAvatarSquare } = useAvatarLayout()

  const primaryColor = usePrimaryColor()
  /**
   * cover article.title -> article-title to match the tailwind csss varaible name
   */
  const _theme = (key: TFlatThemeKey, prefix = 'bg') => {
    return isLightTheme
      ? `${prefix}-${key.replace(/\./g, '-')}`
      : `${prefix}-${key.replace(/\./g, '-')}-dark`
  }

  const global = (className: string) => (isLightTheme ? className : `${className}-dark`)
  const fg = (key: TFlatThemeKey) => _theme(key, 'text')
  const bg = (key: TFlatThemeKey) => _theme(key, 'bg')
  const fill = (key: TFlatThemeKey) => _theme(key, 'fill')
  const br = (key: TFlatThemeKey) => _theme(key, 'border')

  /**
   * use in theme balls and all kinks of gradients
   */
  const rainbow = (color: TColorName, prefix: 'fg'): string => {
    const prefix$ = prefix === 'fg' ? 'text-rainbow' : `${prefix}-rainbow`
    const color$ = camelize(color)

    return isLightTheme ? `${prefix$}-${color$}` : `${prefix$}-${color$}-dark`
  }

  /**
   * use primary color for text/background/border color
   * primary color is set in dashboard
   */
  const primary = (prefix?: 'fg'): string => rainbow(primaryColor, prefix)

  /**
   * this is not typo, cause the exsiting prama is `size`
   */
  const zise = (unit: number): string => clsx(`size-${unit}`)

  const margin = (spacing: TSpace): string => {
    const dir = { top: 'mt', bottom: 'mb', left: 'ml', right: 'mr' }

    return Object.entries(spacing)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${dir[key]}-${value}`)
      .join(' ')
  }

  const avatar = () => (isAvatarSquare ? 'rounded-md' : 'circle')

  return {
    cn,
    global,
    fg,
    bg,
    fill,
    br,
    rainbow,
    primary,
    zise,
    margin,
    avatar,
  }
}
