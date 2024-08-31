import useTwBelt from '~/hooks/useTwBelt'
import usePrimaryColor from '~/hooks/usePrimaryColor'

type TProps = {
  viewerHasUpvoted: boolean
}

export default ({ viewerHasUpvoted }: TProps) => {
  const { cn, bg, br, rainbowSoft, enhanceDark } = useTwBelt()
  const color = usePrimaryColor()

  return {
    wrapper: cn(
      'row-center gap-x-1',
      `hover:${br('text.digest')}`,
      `hover:${bg('alphaBg2')}`,
      'trans-all-200',
      viewerHasUpvoted && cn('mr-2 ml-px pr-2', br('divider'), rainbowSoft(color)),
      enhanceDark(),
    ),
  }
}
