import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, global } = useTwBelt()

  return {
    hoverEffect: cn(
      'group/post',
      'row relative w-full py-2 mb-1.5',
      'before:z-[-1] before:absolute before:top-0 before:left-[-15px] before:w-full before:h-full before:rounded-xl before:transition-all before:duration-200 before:opacity-0',
      'hover:before:opacity-100 pointer',
      global('article-hover-linear'),
    ),
  }
}
