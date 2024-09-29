import useTwBelt from '~/hooks/useTwBelt'

import useBase from '.'

export { cn } from '~/css'

export default () => {
  const { cn, fg, bg, fill } = useTwBelt()
  const base = useBase()

  return {
    wrapper: cn(base.template, 'row-center justify-between px-5'),
    active: base.templateActive,
    left: 'row-center gap-x-2.5',
    right: 'row-center gap-x-3.5',
    brandLogo: cn('size-5 rounded-md', bg('hoverBg')),
    brandText: cn('text-sm', fg('text.digest')),
    center: 'row-center gap-x-5 -ml-4',
    linkItem: cn('text-xs pointer trans-all-100', `hover:${fg('text.title')}`, fg('text.digest')),
    accountIcon: cn('size-3 -mt-0.5', fill('text.digest')),
  }
}
