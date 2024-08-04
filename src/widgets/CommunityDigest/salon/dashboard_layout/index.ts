import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, divider } = useTwBelt()

  return {
    wrapper: cn('w-full h-16', divider(25)),
    inner: cn('column justify-items-center mb-2 w-full'),
    content: 'column-center justify-between',
    baseInfo: 'row-center justify-between w-full pt-2.5',
  }
}
