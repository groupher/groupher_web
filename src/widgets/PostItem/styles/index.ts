import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, global } = useTwBelt()

  return {
    hoverable: cn(
      'group/post',
      'row w-full py-2 mb-1.5 pointer relative',
      'before:z-[-1] before:absolute before:top-0 before:left-[-16px] before:w-full before:h-full before:rounded-xl before:transition-all before:duration-200 before:opacity-0',
      'hover:before:opacity-100',
      global('article-hover-linear'),
    ),
  }
}
