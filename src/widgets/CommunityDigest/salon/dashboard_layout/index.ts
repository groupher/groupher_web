import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, sexyHBorder } = useTwBelt()

  return {
    wrapper: cn('w-full h-16 border-b', sexyHBorder(25)),
    inner: cn('column justify-center mb-2 w-full'),
    content: 'column-center justify-between',
    baseInfo: 'row-center justify-between w-full pt-2.5',
  }
}
