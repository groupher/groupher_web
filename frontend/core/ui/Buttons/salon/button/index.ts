// salon/button.ts
import { COLOR } from '~/const'
import useTwBelt from '~/hooks/useTwBelt'
import type { TColorName, TSizeTSM, TSpace } from '~/spec'

import { getFontSize, getHeight, getPadding, getRound } from '../metrics/button'
import { buttonInner, buttonWrapper } from './variants'

export { cn } from '~/css'

const toSpaceRem = (value: number): string => `${value * 0.25}rem`

type TProps = {
  red: boolean
  ghost: boolean
  soft: boolean
  noBorder: boolean
  iconOnly: boolean
  noLeftRound: boolean
  noRightRound: boolean

  width: string
  px: number | null
  py: number | null
  size: TSizeTSM

  color: TColorName | null

  loading: boolean
  disabled: boolean
} & TSpace

export default function useButtonSalon({
  red,
  ghost,
  soft,
  noBorder,
  iconOnly,
  noLeftRound,
  noRightRound,

  width,
  px,
  py,
  size,

  color,
  loading,
  disabled,
  ...spacing
}: TProps) {
  const { cn, bg, fg, br, primary, rainbow, margin } = useTwBelt()

  const tone = color ? 'color' : red ? 'red' : 'primary'
  const interactive = !disabled && !loading

  // ghost buttons draw their own inner outline; keep wrapper border off to avoid a false shadow ring
  // red/noBorder also always remove the wrapper border, even when disabled
  let wrapperBorder: 'default' | 'none' | 'disabled' = 'default'
  if (ghost || red || noBorder) {
    wrapperBorder = 'none'
  } else if (disabled) {
    wrapperBorder = 'disabled'
  }

  const wrapperBase = buttonWrapper({
    border: loading ? 'none' : wrapperBorder,
    width: width === 'w-full' ? 'full' : 'fit',
  })

  const innerBase = buttonInner({
    mode: ghost ? 'ghost' : 'solid',
    interactive,
    soft,
    width: width === 'w-full' ? 'full' : 'fit',
  })

  const toneBg = () => {
    if (ghost) return bg('transparent')
    if (soft) {
      if (tone === 'color') return rainbow(color!, 'bgLite')
      return bg('hoverBg')
    }
    if (tone === 'color') return rainbow(color!, 'bg')
    if (tone === 'red') return rainbow(COLOR.RED, 'bgLite')
    return primary('bg')
  }

  const toneFg = () => {
    if (ghost || soft) {
      if (tone === 'color') return rainbow(color!, 'fg')
      if (tone === 'red') return rainbow(COLOR.RED, 'fg')
      return primary('fg')
    }

    if (tone === 'color') return fg('title')
    if (tone === 'red') return fg('rainbow.red')
    return fg('button.fg')
  }

  const toneHover = () => {
    if (!interactive || ghost || tone !== 'red') return ''

    return cn(`hover:${rainbow(COLOR.RED, 'bg')}`, `hover:${fg('button.fg')}`)
  }

  const ghostBorder = () => {
    if (!ghost || noBorder) return ''
    if (color) return rainbow(color, 'borderLite')
    if (red) return rainbow(COLOR.RED, 'borderLite')
    return br('text.hint')
  }

  const ghostHoverBg = () => {
    if (!ghost || !interactive) return ''
    if (noBorder) return ''
    if (color) return `hover:${rainbow(color, 'bgLite')}`
    return `hover:${primary('bgLite')}`
  }

  const innerStyle = {
    ...(px != null ? { paddingLeft: toSpaceRem(px), paddingRight: toSpaceRem(px) } : {}),
    ...(py != null ? { paddingTop: toSpaceRem(py), paddingBottom: toSpaceRem(py) } : {}),
  }

  return {
    wrapper: cn(
      wrapperBase,
      iconOnly ? getRound(size) : 'rounded-xl',
      noLeftRound && 'rounded-tl-none rounded-bl-none',
      noRightRound && 'rounded-tr-none rounded-br-none',

      !(ghost || red || noBorder) && br('divider'),
      ghost && noBorder && interactive && `hover:${bg('hoverBg')}`,

      !loading && !ghost && bg('divider'),
      margin(spacing),
    ),

    inner: cn(
      innerBase,

      getPadding(size),
      getHeight(size),
      getFontSize(size),
      getRound(size),
      noLeftRound && 'rounded-tl-none rounded-bl-none',
      noRightRound && 'rounded-tr-none rounded-br-none',

      !loading && toneBg(),
      !loading && toneFg(),
      !loading && toneHover(),

      !loading && ghostBorder(),
      !loading && ghostHoverBg(),
    ),

    children: cn('align-both relative', width === 'w-full' ? 'w-full' : 'w-auto'),
    innerStyle,
  }
}
