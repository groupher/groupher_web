import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, bg } = useTwBelt()

  return {
    wrapper: 'column',
    main: 'row-center grow',
    title: cn(
      'row-center relative text-base no-underline opacity-85 bold-sm',
      'hover:opacity-100 pointer group-hover/post:underline',
      'transition-colors',
      fg('text.title'),
    ),
    dot: cn('size-0.5 circle ml-2 mr-1.5', bg('dot')),
  }
}
