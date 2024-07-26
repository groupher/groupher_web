import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, zise, fill } = useTwBelt()

  return {
    wrapper: 'row-center mb-4 w-full group',
    arrow: cn('ml-1 mr-2', zise(2.5), fill('text.digest')),
    title: cn(
      'text-sm',
      fg('text.digest'),
      `group-hover:${fg('text.title')}`,
      'transition-colors pointer',
    ),
  }
}
