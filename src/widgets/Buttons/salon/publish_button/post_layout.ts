import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fill } = useTwBelt()

  return {
    wrapper: 'row-center justify-between w-40',
    title: cn('text-xs pl-0.5 bold-sm'),
    editIcon: cn('size-3', fill('button.fg')),
  }
}
