import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn } = useTwBelt()

  return {
    wrapper: cn('column items-center'),
  }
}
