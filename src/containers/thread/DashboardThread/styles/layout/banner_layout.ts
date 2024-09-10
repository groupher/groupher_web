import useTwBelt from '~/hooks/useTwBelt'
import useBase from '.'

export { Bar, Circle } from '.'

export { cn } from '~/css'

export default () => {
  const { cn, fg, bg, cutRest, primary, sexyHBorder, sexyVBorder } = useTwBelt()
  const base = useBase()

  return {
    wrapper: base.baseSection,
    select: cn('row-center wrap gap-8 w-full'),
    layout: 'column-align-both group',
    block: cn(base.blockBase, 'relative w-72 h-56'),
    blockActive: base.blockBaseActive,
    communityTitle: cn('text-xs bold-sm', cutRest('w-14'), fg('text.digest')),
    primaryBar: cn('opacity-65', primary('bg')),
    bar: cn('absolute h-1.5 w-20 opacity-40 rounded', bg('text.digest')),
    circle: cn('absolute size-2 circle opacity-40', bg('text.digest')),
    hDivider: cn(sexyHBorder(35)),
    vDivider: cn('absolute', sexyVBorder(35)),
  }
}
