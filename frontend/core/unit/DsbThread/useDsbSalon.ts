import { tr } from '~/css'
import useTwBelt from '~/hooks/useTwBelt'

/** Exposes dsb salon state and actions through the shared React hook boundary. */
export default function useDsbSalon() {
  const { cn, br, bg, hoverBr, shadow, primary, sexyBorder, vividDark } = useTwBelt()
  const cardBase = cn(
    'relative rounded-md border pointer overflow-hidden trans-all-100',
    br('divider'),
    `hover:${primary('border')}`,
    bg('alphaBg'),
  )
  const cardIdle = cn('saturate-0 opacity-80', 'hover:opacity-100 hover:saturate-100')
  const cardActiveDecoration = cn(primary('borderLite'), shadow('md'))
  const cardActive = cn(
    'opacity-100 saturate-100',
    cardActiveDecoration,
    `hover:${primary('border')}`,
  )
  const barBase = cn('rounded', primary('bg'), vividDark())
  const circleBase = cn('circle', primary('bg'), vividDark())
  const iconBase = cn(primary('fill'))
  const cardRecipe = (className: string) =>
    tr({
      base: cn(cardBase, className),
      variants: {
        state: {
          idle: cardIdle,
          active: cn(cardActive, 'hover:opacity-100 hover:saturate-100'),
        },
      },
      defaultVariants: { state: 'idle' },
    })

  return {
    wrapper: 'column w-3/5 ',
    banner: cn('relative h-16 w-full border-b mb-10', br('divider')),
    tabs: 'absolute -left-2 bottom-0',

    section: 'pb-7',
    cardBase,
    cardIdle,
    cardRecipe,
    card: cn(cardBase, 'w-72 p-4', cardIdle),
    cardActive,
    cardActiveDecoration,

    box: cn('relative rounded-md', hoverBr()),
    divider: cn(sexyBorder(), 'mt-14 mb-14'),

    barBase,
    bar: cn(barBase, 'h-1.5 w-20 opacity-30'),
    circleBase,
    circle: cn(circleBase, 'size-2 opacity-40'),
    iconBase,
    icon: cn(iconBase, 'size-3 opacity-65'),
  }
}
