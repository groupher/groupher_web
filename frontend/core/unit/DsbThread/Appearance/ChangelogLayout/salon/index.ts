import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn } = useTwBelt()
  const base = useBase()

  return {
    wrapper: base.section,
    block: base.cardRecipe('w-72 h-80 p-5'),
    select: 'row-center gap-x-10 w-full',
    bar: cn(base.barBase, 'h-1.5 w-20 opacity-40'),
    layout: 'column-align-both group',

    frame: 'column s-full',

    classicList: 'column s-full justify-between',
    classicEntry: 'column gap-4',
    classicCover: cn(base.barBase, 'static h-20 w-40 self-center rounded-md opacity-15'),
    classicText: 'column w-40 self-center gap-2',
    classicTitle: cn(base.barBase, 'static h-2.5 w-14 opacity-30'),
    classicBodyWide: cn(base.barBase, 'static h-1.5 w-32 opacity-20'),
    classicBodyNarrow: cn(base.barBase, 'static h-1.5 w-28 opacity-10'),

    minimalList: 'column s-full justify-between',
    minimalListInner: 'mx-auto column s-full justify-between',
    minimalEntry: 'column-center w-full',
    minimalHeader: 'row-start w-2/3',
    minimalText: 'column gap-2.5',
    minimalMeta: cn(base.barBase, 'static h-1.5 w-7 opacity-20'),
    minimalTitle: cn(base.barBase, 'static h-2.5 w-20 opacity-30'),
    minimalBodyWide: cn(base.barBase, 'static h-1.5 w-28 opacity-30'),
    minimalBodyNarrow: cn(base.barBase, 'static h-1.5 w-24 opacity-20'),
    minimalBodyTiny: cn(base.barBase, 'static h-1.5 w-16 opacity-10'),
    minimalMain: 'column-start mx-auto gap-4',
    minimalThumbRow: 'row gap-2',
    minimalThumb: cn(base.barBase, 'static h-10 w-12 rounded-md opacity-10'),
  }
}
