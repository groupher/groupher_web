import type { TSpace, TSizeTSM } from '~/spec'

import { getHeight, getPadding, getRouned, getFontSize } from './metircs/button'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

type TProps = {
  ghost?: boolean
  type?: 'primary' | 'red'
  space?: number | null
  size?: TSizeTSM
  noBorder?: boolean
  disabled?: boolean
} & TSpace

export default ({ type, ghost, noBorder, size, space, disabled, ...spacing }: TProps) => {
  const { cn, margin, primary, br, fg, bg, isDarkBlack } = useTwBelt()

  const isRed = type === 'red'
  const common = 'select-none touch-manipulation outline-none bg-none whitespace-nowrap'

  return {
    wrapper: cn(
      common,
      disabled && 'saturate-50 cursor-not-allowed',
      space && `pl-${space} pr-${space}`,
      !ghost && !isRed && 'border border-4',
      getRouned(size),
      br('divider'),
      !ghost && bg('divider'),
      margin(spacing),
    ),
    inner: cn(
      'align-both relative overflow-hidden text-center border border-transparent pointer',
      'hover:brightness-110 active:brightness-95 trans-all-200',
      getRouned(size),
      getHeight(size),
      getPadding(size),
      getFontSize(size),
      !ghost && primary('bg'),
      !ghost && isDarkBlack && bg('rainbow.blackBtn'),
      ghost && `hover:${primary('bgSoft')}`,
      // ghost && `hover:${primary('bgSoft')}`,
      // ghost && 'saturate-50',
      ghost && primary('borderSoft'),
      ghost && bg('transparent'),
      ghost ? primary('fg') : fg('button.fg'),
    ),
    innerRed: cn(
      'hover:brightness-105 active:brightness-95 trans-all-200',
      bg('button.redBg'),
      fg('rainbow.red'),
    ),
    children: 'align-both relative w-full z-20',
  }
}
