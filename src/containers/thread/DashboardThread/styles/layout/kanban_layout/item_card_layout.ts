import useTwBelt from '~/hooks/useTwBelt'

import useBase from '..'

export { cn } from '~/css'

export default () => {
  const { cn, bg, avatar } = useTwBelt()
  const base = useBase()

  return {
    wrapper: cn('p-5 pl-6 rounded-md w-11/12 mt-7', bg('hoverBg')),

    select: cn('row-center wrap gap-x-7 gap-y-8 w-full'),
    block: cn(base.blockBase, 'w-64 h-24'),
    blockActive: base.blockBaseActive,
    layout: 'column-align-both',
    icon: cn(base.icon, 'size-5'),
    userAvatar: cn(base.bar, 'absolute size-4', avatar()),
    bar: cn(base.bar, 'h-1.5 w-20 opacity-40'),
    circle: cn(base.circle, 'opacity-40'),
  }
}
