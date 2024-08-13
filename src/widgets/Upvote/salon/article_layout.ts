import useTwBelt from '~/hooks/useTwBelt'
import usePrimaryColor from '~/hooks/usePrimaryColor'

type TProps = {
  viewerHasUpvoted: boolean
}

export default ({ viewerHasUpvoted }: TProps) => {
  const { cn, br, bg, fg, rainbowLight, primary, enhanceDark } = useTwBelt()
  const color = usePrimaryColor()

  return {
    wrapper: cn('column-align-both', enhanceDark()),
    button: cn(
      'align-both w-44 py-2 rounded-xl border',
      br('divider'),
      `hover:${bg('alphaBg2')}`,
      viewerHasUpvoted && cn(rainbowLight(color)),
    ),
    alias: cn('text-sm ml-1.5 mt-px', viewerHasUpvoted ? primary('fg') : fg('text.digest')),
  }
}
