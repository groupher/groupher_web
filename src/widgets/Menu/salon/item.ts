import type { TActive } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

type TProps = TActive

export default ({ active }: TProps) => {
  const { cn, bg, fg, br } = useTwBelt()

  return {
    wrapper: cn(
      'row-center group rounded py-1.5 px-1.5 border border-transparent bg-transparent pointer trans-all-200',
      fg('text.digest'),
      active && bg('menuHoverBg'),
      active && br('divider'),
      `hover:${fg('text.title')}`,
      `hover:${bg('menuHoverBg')}`,
      `hover:${br('divider')}`,
    ),
    full: '!items-start',
    fullIconBox: 'mt-1 mr-1.5 scale-110',
    main: 'mt-0.5 mb-1',
    title: cn('text-sm', `group-hover:${fg('text.title')}`),
    fullTitle: cn('bold-sm'),
    desc: cn('text-xs mt-1 line-clamp-2', fg('text.digest')),
  }
}
