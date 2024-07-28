import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, avatar, fg, bg, br, fill } = useTwBelt()

  return {
    panel: cn('w-40 px-2 py-2'),
    avatar: cn('size-4', avatar('sm')),
    baseInfo: 'ml-3 mb-4',
    userName: cn('text-sm bold-sm', fg('text.title')),
    loginBy: cn('font-xs opacity-80', fg('text.digest')),
    menuBar: cn(
      'row-center group text-sm h-8 w-full px-2.5 py-0.5 gap-y-2 border border-transparent rounded-md pointer',
      `hover:${fg('text.title')}`,
      `hover:${bg('menuHoverBg')}`,
      `hover:${br('divider')}`,
      'transition-colors',
      fg('text.digest'),
    ),
    warningActive: cn(`hover:${fg('rainbow.red')}`, `hover:${bg('rainbow.redBg')}`),
    menuTitle: cn('grow'),
    icon: cn('size-3.5 group-smoky', fill('text.digest')),
    logoutIcon: cn('size-3 group-smoky', `group-hover:${fill('rainbow.red')}`),
  }
}
