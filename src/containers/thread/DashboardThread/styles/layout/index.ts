import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, br, bg, fill, shadow, primary, sexyHBorder, enhanceDark, isBlackPrimary } =
    useTwBelt()

  return {
    wrapper: 'column pl-16 w-10/12',
    banner: cn('relative h-16 w-full border-b mb-10', br('divider')),
    tabs: 'absolute -left-2 bottom-0',
    //
    baseSection: 'pb-7',
    blockBase: cn(
      'relative border w-72 rounded-md px-4 py-4 border pointer saturate-0 opacity-55',
      'hover:opacity-100 hover:saturate-100 trans-all-200',
      `hover:${primary('borderSoft')}`,
      br('text.hint'),
      bg('alphaBg'),
    ),
    blockBaseActive: cn(
      'opacity-100 saturate-100',
      primary('borderSoft'),
      `hover:${primary('border')}`,
      isBlackPrimary && br('text.link'),
      shadow('md'),
    ),

    box: cn('relative rounded-md border', primary('borderSoft'), isBlackPrimary && br('text.link')),
    divider: sexyHBorder(35, 'mt-14 mb-14'),

    // basic shape
    bar: cn(
      'absolute h-1.5 w-20 opacity-40 rounded',
      primary('bg'),
      isBlackPrimary && bg('text.link'),
      enhanceDark(),
    ),
    circle: cn(
      'absolute size-2 circle opacity-40',
      primary('bg'),
      isBlackPrimary && bg('text.link'),
      enhanceDark(),
    ),
    icon: cn('absolute size-3 opacity-65', primary('fill'), isBlackPrimary && fill('text.link')),
  }
}
