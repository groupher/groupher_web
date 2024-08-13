import { clsx, type ClassValue } from 'clsx'

import { cn } from '~/css'
import type { TColorName, TSpace } from '~/spec'
import { COLOR_NAME } from '~/const/colors'
import type { TFlatThemeKey } from '~/utils/themes/skins'

import { container as containerConf } from '~/const/container.json'
import { camelize } from '~/fmt'

import useTheme from '~/hooks/useTheme'
import useMetric from '~/hooks/useMetric'
import useAvatarLayout from '~/hooks/useAvatarLayout'
import usePrimaryColor from '~/hooks/usePrimaryColor'

type TColorPrefix = 'fg' | 'bg' | 'fill' | 'border'
type TBreakOut = 'footer' | 'header'

type TRet = {
  cn: (...inputs: ClassValue[]) => string
  container: () => string
  global: (className: string) => string
  fg: (key: TFlatThemeKey) => string
  bg: (key: TFlatThemeKey) => string
  fill: (key: TFlatThemeKey) => string
  br: (key: TFlatThemeKey) => string
  rainbow: (color: TColorName, prefix?: TColorPrefix) => string
  rainbowLight: (color: TColorName | string) => string
  primary: (prefix?: TColorPrefix) => string
  zise: (unit: number) => string
  margin: (spacing: TSpace) => string
  divider: (turn?: number) => string
  avatar: (level?: 'md' | 'sm' | '') => string
  gradiientBar: (color: TColorName) => string
  breakOut: (type?: TBreakOut) => string
  enhanceDark: () => string
}

/**
 * NOTE: the classNams returned from here, must me declared in the tailwind.config's safelist
 * even you return static strings, cauze those are consided as dynamic, and tailwind will not know them
 */
export default (): TRet => {
  const { isLightTheme } = useTheme()
  const metric = useMetric()
  const { isSquare: isAvatarSquare } = useAvatarLayout()

  const primaryColor = usePrimaryColor()
  const container = () => `container-${metric.toLowerCase()}`

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

  const rainbowLight = (color: TColorName | string): string => {
    const prefix$ = 'bg-rainbow'
    const color$ = camelize(color)

    if (color === COLOR_NAME.BLACK) {
      return bg('hoverBg')
    }

    return isLightTheme ? `${prefix$}-${color$}Bg` : `${prefix$}-${color$}Bg-dark`
  }

  /**
   * use primary color for text/background/border color
   * primary color is set in dashboard
   */
  const primary = (prefix: 'fg'): string => rainbow(primaryColor, prefix)

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

  const divider = (turn = 35): string => {
    return cn('h-px w-full border-b', `'sexy-border-${turn}`)
  }

  const avatar = (level = 'md') => {
    if (isAvatarSquare) {
      return level === '' ? 'rounded' : `rounded-${level}`
    }

    return 'circle'
  }

  const gradiientBar = (color: TColorName): string => {
    return `bg-gradient-to-r from-rainbow-${color.toLocaleLowerCase()}Bg to-transparent`
  }

  const breakOut = (type: TBreakOut = 'footer') => {
    const unit = containerConf[metric.toLowerCase()]

    if (type === 'footer') {
      return cn(
        'w-full',
        `w-[${unit.width}]`,
        `-ml-${unit.pl}`,
        `mr-${unit.pr}`,
        `pl-${unit.pl}`,
        `pr-${unit.pr}`,
        global('footer-inner-shadow'),
      )
    }

    return 'w-full'
  }

  const enhanceDark = (): string => {
    if (!isLightTheme) return 'saturate-150 brightness-125'

    return ''
  }

  return {
    cn,
    global,
    container,
    fg,
    bg,
    fill,
    br,
    rainbow,
    rainbowLight,
    primary,
    zise,
    margin,
    divider,
    avatar,
    gradiientBar,
    breakOut,
    enhanceDark,
  }
}
