import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, global, divider } = useTwBelt()

  return {
    wrapper: cn('w-72 max-w-72 border-r', global('sexy-border-40')),
    innerWrapper: cn('column h-lvh min-h-full mt-3'),
    tabs: cn('row-center justify-start w-4/5 ml-1'),
    fileTree: 'mt-2.5 ml-2.5',
    divider: cn(divider(), 'w-52 -ml-2.5'),
  }
}
