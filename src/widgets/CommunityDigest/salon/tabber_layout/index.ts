import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, br } = useTwBelt()

  return {
    wrapper: 'row justify-items-center w-full min-h-80',
    inner: 'column w-full',
    tabs: cn('row-center w-full border-b mb-2 pr-4', br('divider')),
  }
}
