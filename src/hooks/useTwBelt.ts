import { clsx, type ClassValue } from 'clsx'

import { cn } from '~/css'
import type { TColorName, TSpace } from '~/spec'
import { COLOR_NAME } from '~/const/colors'
import type { TFlatThemeKey } from '~/utils/themes/skins'

import { container as containerConf, borderSoft as borderSoftConf } from '~/const/twConfig.json'
import { camelize } from '~/fmt'

import METRIC from '~/const/metric'
import useTheme from '~/hooks/useTheme'
import useMetric from '~/hooks/useMetric'
import useAvatarLayout from '~/hooks/useAvatarLayout'
import usePrimaryColor from '~/hooks/usePrimaryColor'

type TColorPrefix = 'fg' | 'bg' | 'bgSoft' | 'fill' | 'border' | 'borderSoft'
type TLinkColorPrefix = 'fg' | 'fill'
type TBreakOut = 'footer' | 'header'
type TMenuPart = 'bg' | 'bar' | 'title' | 'link'
type TShadowSize = 'md' | 'lg' | 'xl'

type TRet = {
  cn: (...inputs: ClassValue[]) => string
  container: () => string
  linkable: () => string
  global: (className: string) => string
  fg: (key: TFlatThemeKey) => string
  bg: (key: TFlatThemeKey) => string
  fill: (key: TFlatThemeKey) => string
  br: (key: TFlatThemeKey) => string
  rainbow: (color: TColorName, prefix?: TColorPrefix) => string
  rainbowSoft: (color: TColorName | string) => string
  rainbowPale: (color: TColorName | string) => string
  primary: (prefix?: TColorPrefix) => string
  linker: (prefix?: TLinkColorPrefix) => string
  zise: (unit: number) => string
  margin: (spacing: TSpace) => string
  divider: () => string
  sexyHBorder: (turn: number, classNames?: string) => string
  sexyVBorder: (turn: number, classNames?: string) => string
  avatar: (level?: 'md' | 'sm' | '') => string
  gradiientBar: (color: TColorName) => string
  breakOut: (type?: TBreakOut) => string
  enhanceDark: () => string
  menu: (part: TMenuPart) => string
  shadow: (size: TShadowSize) => string
  cutRest: (classname?: string) => string

  isDarkBlack: boolean
  isBlackPrimary: boolean
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

  const linkable = () => {
    return 'no-underline pointer hover:underline'
  }

  const container = () => {
    return `container-${metric.toLowerCase()}`
  }

  /**
   * black color (default primary color) in dark theme should be treat different
   * need spec color for it according the situation
   */
  const isDarkBlack = !isLightTheme && primaryColor === COLOR_NAME.BLACK
  const isBlackPrimary = primaryColor === COLOR_NAME.BLACK

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

  const _rainbowalias = (prefix: TColorPrefix): string => {
    switch (prefix) {
      case 'fg': {
        return 'text-rainbow'
      }

      case 'bgSoft': {
        return 'bg-rainbow'
      }

      case 'borderSoft': {
        return 'border-rainbow'
      }

      default: {
        return `${prefix}-rainbow`
      }
    }
  }

  /**
   * use in theme balls and all kinks of gradients
   */
  const rainbow = (color: TColorName, prefix = 'fg'): string => {
    const prefix$ = _rainbowalias(prefix as TColorPrefix)
    const color$ = camelize(color)

    if (prefix === 'bgSoft') {
      if (color === COLOR_NAME.BLACK) {
        return bg('hoverBg')
      }

      return isLightTheme ? `${prefix$}-${color$}Soft` : `${prefix$}-${color$}Soft-dark`
    }

    if (prefix === 'borderSoft') {
      const opacity = isLightTheme ? borderSoftConf.opacity : borderSoftConf.opacity_dark

      if (isDarkBlack) {
        return 'border-text-hint-dark'
      }

      return isLightTheme
        ? `${prefix$}-${color$}/${opacity}`
        : `${prefix$}-${color$}-dark/${opacity}`
    }

    return isLightTheme ? `${prefix$}-${color$}` : `${prefix$}-${color$}-dark`
  }

  const rainbowSoft = (color: TColorName | string): string => {
    const prefix$ = 'bg-rainbow'
    const color$ = camelize(color)

    if (color === COLOR_NAME.BLACK) {
      return bg('hoverBg')
    }

    return isLightTheme ? `${prefix$}-${color$}Soft` : `${prefix$}-${color$}Soft-dark`
  }

  const rainbowPale = (color: TColorName | string): string => {
    const prefix$ = 'bg-rainbow'
    const color$ = camelize(color)

    if (color === COLOR_NAME.BLACK) {
      return bg('hoverBg')
    }

    return isLightTheme ? `${prefix$}-${color$}Pale` : `${prefix$}-${color$}Pale-dark`
  }

  /**
   * use primary color for text/background/border color
   * primary color is set in dashboard
   */
  const primary = (prefix = 'fg'): string => rainbow(primaryColor, prefix)

  const linker = (prefix = 'fg'): string => {
    if (primaryColor === COLOR_NAME.BLACK) {
      if (prefix === 'fg') return fg('text.link')

      return fill('text.link')
    }

    return rainbow(primaryColor, prefix)
  }
  /**
   * this is not typo, cause the exsiting prama is `size`
   */
  const zise = (unit: number): string => clsx(`size-${unit}`)

  const margin = (spacing: TSpace): string => {
    const dir = { top: 'mt', bottom: 'mb', left: 'ml', right: 'mr' }

    return Object.entries(spacing)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        if (value !== 'px' && value < 0) {
          return `-${dir[key]}-${Math.abs(value)}`
        }

        return `${dir[key]}-${value}`
      })
      .join(' ')
  }

  const divider = (): string => {
    return cn('w-full h-px', bg('divider'))
  }

  const sexyHBorder = (turn: number, classNames = ''): string => {
    return cn('h-px w-full border-b', global(`sexy-border-${turn}`), classNames)
  }

  const sexyVBorder = (turn: number, classNames = ''): string => {
    return cn('h-full w-px border-l', global(`sexy-border-${turn}`), classNames)
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
    const curMetric = metric || METRIC.COMMUNITY

    const unit = containerConf[curMetric.toLowerCase()]

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

  const menu = (part: TMenuPart): string => {
    switch (part) {
      case 'bg': {
        return _theme('popover.bg')
      }
      case 'bar': {
        return cn(
          'group/menubar row-center text-sm w-full border border-transparent rounded-md pointer',
          'px-1.5 py-2 cursor-pointer',
          'trans-all-100',
          `hover:${fg('text.title')}`,
          `hover:${bg('menuHoverBg')}`,
          `hover:${br('divider')}`,
          fg('text.digest'),
        )
      }
      case 'title': {
        return cn('text-sm grow', `group-hover/menubar:${fg('text.title')}`)
      }
      case 'link': {
        return cn('size-3.5 opacity-0 group-hover/menubar:opacity-60', fill('text.digest'))
      }
      default: {
        return ''
      }
    }
  }

  const shadow = (size: TShadowSize): string => {
    return global(`shadow-${size}`)
  }

  const cutRest = (classnames = 'w-12'): string => {
    return cn('truncate', classnames)
  }

  return {
    cn,
    global,
    container,
    linkable,
    fg,
    bg,
    fill,
    br,
    rainbow,
    rainbowSoft,
    rainbowPale,
    primary,
    linker,
    zise,
    margin,
    divider,
    sexyHBorder,
    sexyVBorder,
    avatar,
    gradiientBar,
    breakOut,
    enhanceDark,
    menu,
    shadow,
    cutRest,
    isDarkBlack,
    isBlackPrimary,
  }
}
