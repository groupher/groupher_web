import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg } = useTwBelt()

  return {
    wrapper: 'column-align-both w-full mt-12',
    note: cn('text-xs', fg('text.digest')),
    link: cn(
      'text-xs ml-0.5 mr-0.5 no-underline hover:underline transition-colors',
      `hover:${fg('text.title')}`,
      fg('text.digest'),
    ),
    bottom: 'row-center mt-1.5',
  }
}
