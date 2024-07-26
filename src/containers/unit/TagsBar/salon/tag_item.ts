import type { TActive, TColor } from '~/spec'
import useTwBelt from '~/hooks/useTwBelt'

type TProps = TActive & TColor

export default ({ active, color }: TProps) => {
  const { cn, fg, bg, fill, rainbow, rainbowLight } = useTwBelt()

  return {
    wrapper: cn(
      'row-center p-1 max-w-full rounded-lg border border-transparent',
      active ? 'mr-1' : '',
      'group pointer',
      !active ? `hover:${bg('hoverBg')}` : '',
      active ? rainbowLight(color) : 'transparent',
    ),
    title: cn(
      active ? 'bold-sm' : '',
      active ? rainbow(color, 'fg') : fg('text.digest'),
      active || `group-hover:${fg('text.title')}`,
      'transition-colors',
    ),
    tag: 'row-center grow text-sm',
    closeBox: cn(
      'row-align-both size-5 rounded',
      !active ? `hover:${bg('hoverBg')}` : '',
      'hover:opacity-80 pointer',
    ),
    closeIcon: cn('size-3.5', fill('text.digest')),
  }
}
