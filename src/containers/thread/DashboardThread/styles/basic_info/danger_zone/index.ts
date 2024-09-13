import { COLOR_NAME } from '~/const/colors'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, rainbow, fg, bg, fill } = useTwBelt()

  return {
    wrapper: 'column w-full',
    divider: cn('w-full h-px', bg('divider')),
    dangerTitle: cn('text-base bold-sm mb-5', rainbow(COLOR_NAME.RED, 'fg')),
    item: cn('row items-start pt-3.5 w-full'),
    title: cn('row-center text-sm mb-2.5', fg('text.title')),
    desc: cn('text-sm', fg('text.digest')),
    icon: cn('size-4 ml-1 pointer', `hover: ${fill('text.title')}`, fill('text.digest')),
  }
}
