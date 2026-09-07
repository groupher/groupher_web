import { tr } from '~/css'
import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn } = useTwBelt()
  const base = useBase()

  return {
    wrapper: base.section,
    block: tr({
      base: cn(base.cardBase, 'flex h-14 w-full items-center justify-center px-3 py-0'),
      variants: {
        state: {
          idle: base.cardIdle,
          active: base.cardActive,
        },
      },
      defaultVariants: { state: 'idle' },
    }),
    select: 'grid w-full grid-cols-1 gap-6 md:grid-cols-3',
    layout: 'column-align-both min-w-0',

    previewList: 'flex w-full items-center justify-center gap-5',
    previewItem: 'flex min-w-0 items-center',

    bar: cn(base.barBase, 'ml-1.5 h-1.5 w-12 opacity-40'),
    circle: cn(base.circleBase, 'size-3 shrink-0 opacity-40'),

    hashIcon: cn(base.iconBase, 'size-4 shrink-0'),
  }
}
