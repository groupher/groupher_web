import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg } = useTwBelt()

  return {
    wrapper: 'row mt-0.5',
    title: cn(
      'relative text-base no-underline opacity-85 bold-sm',
      'hover:opacity-100 pointer group-hover/post:underline',
      'transition-colors',
      fg('text.title'),
    ),
    brief: cn('row-center grow ml-2.5 mb-1.5', fg('text.digest')),
  }
}
