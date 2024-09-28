import useBase from '..'
import useTwBelt from '~/hooks/useTwBelt'

export { Bar, Circle } from '..'

export { cn } from '~/css'

export default () => {
  const { cn, sexyHBorder } = useTwBelt()
  const base = useBase()

  return {
    wrapper: base.baseSection,
    block: cn(base.blockBase, 'align-both w-72 h-60'),
    blockActive: base.blockBaseActive,
    select: cn('row-center wrap gap-x-8 gap-y-8 w-full'),
    layout: 'column-align-both',
    divider: cn(sexyHBorder(35, 'mt-20 mb-20')),

    bar: cn(base.bar, 'h-1.5 w-20 opacity-40'),
    circle: cn(base.circle, 'size-3.5 opacity-40'),
  }
}
