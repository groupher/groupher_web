import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, enhanceDark } = useTwBelt()

  return {
    wrapper: cn('column-align-both gap-y-0.5', enhanceDark()),
  }
}
