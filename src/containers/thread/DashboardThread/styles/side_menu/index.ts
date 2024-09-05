import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg } = useTwBelt()

  return {
    wrapper: cn('column w-40 min-w-40 pt-8', fg('text.digest')),
  }
}
