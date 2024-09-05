import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, primary } = useTwBelt()

  return {
    wrapper: 'pb-7',
    label: cn('align-both size-10 align-both circle border pointer', primary('borderSoft')),
    colorBall: cn('size-8 circle', primary('bg')),
  }
}
