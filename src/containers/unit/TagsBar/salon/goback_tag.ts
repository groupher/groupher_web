import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, zise, primary } = useTwBelt()

  return {
    wrapper: 'row-center mb-5 w-full group',
    arrow: cn('ml-1 mr-2 opacity-80', zise(2.5), primary('fill'), 'group-hover:opacity-100'),
    title: cn('text-xs', primary('fg'), 'group-hover:bold-sm', 'transition-colors pointer'),
  }
}
