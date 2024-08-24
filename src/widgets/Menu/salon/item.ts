import type { TActive } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

type TProps = TActive

export default ({ active }: TProps) => {
  const { cn, bg, fg, br, menu } = useTwBelt()

  return {
    wrapper: cn('py-0.5 px-1.5', active && bg('menuHoverBg'), active && br('divider'), menu('bar')),
    full: '!items-start',
    fullIconBox: 'mt-1 mr-1.5 scale-110',
    main: 'mt-0.5 mb-1',
    title: cn(menu('title')),
    fullTitle: cn('bold-sm'),
    desc: cn('text-xs mt-1 line-clamp-2', fg('text.digest')),
  }
}
