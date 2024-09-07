import useTwBelt from '~/hooks/useTwBelt'

import useBase from '.'

export { cn } from '~/css'

export default () => {
  const { cn, fill, fg } = useTwBelt()
  const base = useBase()

  return {
    wrapper: base.baseSection,
    block: cn(base.blockBase, 'w-44 h-20'),
    blockActive: base.blockBaseActive,
    select: cn('row-center gap-x-10 w-full'),
    brand: 'row-center',
    brandIcon: cn('size-6', fill('text.digest')),
    brandTitle: cn('text-base bold-sm', fg('text.digest')),
    layout: 'column-align-both group',
    layoutTitle: cn('group-smoky-65'),
    layoutTitleActive: cn('opacity-100'),
  }
}
