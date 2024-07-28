import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fill } = useTwBelt()

  const icon = cn('size-3.5 pointer', fill('text.digest'))

  return {
    wrapper: 'px-2.5 py-2',
    iconBox: 'align-both size-5 mr-2',
    icon,
    linkIcon: cn(icon, 'opacity-0 group-hover:opacity-100'),
    dashboardIcon: cn(icon, 'size-4'),
  }
}
