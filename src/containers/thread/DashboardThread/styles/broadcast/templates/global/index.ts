import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, primary } = useTwBelt()

  return {
    wrapper: cn('column-align-both w-full h-full gap-4 pt-10 pb-8'),
    arrow: cn('size-3.5 ml-1', primary('fill')),
  }
}
