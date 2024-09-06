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
  noLeftRouned: boolean
} & TSpace

export default ({
  type,
  ghost,
  noBorder,
  size,
  space,
  disabled,
  noLeftRouned,
  ...spacing
}: TProps) => {
  const { cn, margin, primary, br, fg, bg, isDarkBlack } = useTwBelt()

  const isRed = type === 'red'
  const common = 'group select-none touch-manipulation outline-none bg-none whitespace-nowrap'

  return {
    wrapper: cn(
      common,
      disabled && 'saturate-50 cursor-not-allowed',
      !ghost && !isRed && !noBorder && 'border border-4',
      'w-full rounded-xl',
      br('divider'),
      !ghost && bg('divider'),
      margin(spacing),
    ),
    inner: cn(
      'align-both relative text-center break-keep border border-transparent pointer',
      'hover:brightness-110 active:brightness-95 trans-all-200',
      getRouned(size),
      getHeight(size),
      getPadding(size),
      space && `px-${space}`,
      getFontSize(size),
      noLeftRouned && 'rounded-tl-none rounded-bl-none',
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
    children: cn('align-both relative w-auto'),
  }
}
