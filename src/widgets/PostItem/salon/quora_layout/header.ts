import useTwBelt from '~/hooks/useTwBelt'

type TProps = {
  isPinned?: boolean
}

export default ({ isPinned }: TProps) => {
  const { cn, fg, bg, primary } = useTwBelt()

  return {
    wrapper: 'column',
    topping: 'row-center mb-1',
    main: 'row-center grow',
    title: cn(
      'row-center relative text-base no-underline opacity-85',
      isPinned ? primary('fg') : fg('text.title'),
      isPinned ? 'bold' : 'bold-sm',
      'hover:opacity-100 pointer group-hover/post:underline',
      'transition-colors',
    ),
    author: cn('text-xs', fg('text.hint')),
    publish: cn('text-xs', fg('text.hint')),
    dot: cn('size-0.5 circle ml-2 mr-1.5', bg('dot')),
  }
}
