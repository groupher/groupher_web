import useTwBelt from '~/hooks/useTwBelt'
import type { TActive, TSpace } from '~/spec'

type TProps = {
  count: number
} & TSpace &
  TActive

export default ({ count, active, ...spacing }: TProps) => {
  const { cn, fg, enhanceDark, margin, primary } = useTwBelt()

  return {
    wrapper: cn(
      'text-sm',
      fg('text.digest'),
      active && primary('fg'),
      count > 0 && 'bold-sm',
      enhanceDark(),
      margin(spacing),
    ),
  }
}
