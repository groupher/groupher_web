import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

type TProps = {
  isHighLight: boolean
}

export default ({ isHighLight }: TProps) => {
  const { cn, fg, fill, global } = useTwBelt()

  return {
    wrapper: cn('row-center', fg('text.digest')),
    highLight: cn('bg-clip-text bold-sm', global('count-highlight')),
    viewIcon: cn('size-3 mr-1', isHighLight ? fill('heightIcon') : fill('text.digest')),
    count: 'text-xs',
  }
}
