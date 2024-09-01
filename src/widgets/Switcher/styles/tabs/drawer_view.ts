import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, fg, bg } = useTwBelt()

  return {
    wrapper: cn(
      'row-center relative overflow-hidden w-full h-9 rounded-md py-1.5 px-1',
      bg('hoverBg'),
    ),
    tabItem: cn('align-both h-full grow ml-px mr-px rounded-md text-xs pointer', fg('text.title')),
    tabItemActive: cn('bold-sm', fg('text.digest')),
  }
}
