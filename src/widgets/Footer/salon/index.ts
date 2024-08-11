import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, breakOut } = useTwBelt()

  return {
    wrapper: cn('column-align-both min-h-14 mt-20 pt-14 pb-8', breakOut()),
  }
}
