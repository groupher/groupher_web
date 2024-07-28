import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, fg, bg, br, primary, fill } = useTwBelt()

  return {
    wrapper: cn('row-center gap-x-4'),
    menuPanel: cn('w-36', bg('popover.bg')),
    link: cn(
      'row-center text-sm rounded px-2 py-px pointer no-underline border border-transparent',
      `hover:${fg('text.title')}`,
      `hover:${bg('menuHoverBg')}`,
      `hover:${br('divider')}`,
      fg('text.digest'),
    ),
    linkActive: cn(primary('fg'), bg('hoverBg')),
    grouItem: cn('relative pr-4'),
    arrowIcon: cn('absolute size-3.5 right-px -rotate-90', fill('text.digest')),
  }
}
