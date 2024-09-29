import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, br, bg, primary, shadow } = useTwBelt()

  return {
    wrapper: cn('column-align-both gap-4 pb-8'),
    template: cn(
      'w-full h-16 border rounded-md pointer',
      `hover:${primary('border')}`,
      br('divider'),
      bg('alphaBg'),
      'trans-all-100',
    ),
    templateActive: cn(primary('borderSoft'), shadow('md')),
    arrowIcon: cn('size-3.5 rotate-180', primary('fill')),
  }
}
