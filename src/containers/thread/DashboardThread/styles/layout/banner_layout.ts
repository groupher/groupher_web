import useTwBelt from '~/hooks/useTwBelt'
import useBase from '.'

export { cn } from '~/css'

export default () => {
  const { cn, fg, bg, cutRest, primary, sexyHBorder, sexyVBorder, isBlackPrimary } = useTwBelt()
  const base = useBase()

  return {
    wrapper: base.baseSection,
    select: cn('row-center wrap gap-8 w-full'),
    layout: 'column-align-both group',
    block: cn(base.blockBase, 'relative h-56'),
    blockActive: base.blockBaseActive,
    communityTitle: cn(
      'text-xs bold-sm',
      cutRest('w-14'),
      primary('fg'),
      isBlackPrimary && fg('text.link'),
    ),
    primaryBar: cn('opacity-65', primary('bg'), isBlackPrimary && bg('text.link')),
    bar: base.bar,
    circle: base.circle,

    hDivider: cn(sexyHBorder(35)),
    vDivider: cn('absolute', sexyVBorder(35)),
  }
}
