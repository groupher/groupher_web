import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn, bg } = useTwBelt()
  const base = useBase()

  return {
    select: 'row-center wrap gap-x-5 gap-y-8 w-full',
    block: base.cardRecipe('h-48 px-5 pt-5 pb-0'),
    layout: 'column-align-both',

    frame: 'column s-full gap-5',
    toolbar: 'flex items-center justify-between',
    toolbarLeft: 'h-1.5 w-12 opacity-30',
    toolbarRight: 'h-1.5 w-6 opacity-30',

    barBase: cn(base.barBase, 'static'),
    bar: cn(base.barBase, 'static h-1.5 w-20 opacity-40'),
    boardGrid: 'grid min-h-0 flex-1 grid-cols-3 items-end gap-2.5',
    boardColumn: cn(
      'mt-auto flex h-36 min-h-0 flex-col justify-start self-end rounded-lg rounded-b-none px-2 pt-2.5',
      bg('alphaBg'),
    ),
    boardContent: 'flex min-h-0 flex-col gap-2',
    card: cn(base.barBase, 'static h-7 w-full rounded'),
    cardBase: cn(base.barBase, 'static'),

    waterfall: 'flex min-h-0 flex-1 flex-col gap-4',
    waterfallGroup: 'flex flex-col gap-2.5',
    waterfallRow: 'flex items-center justify-between gap-4',
    waterfallMain: cn(base.barBase, 'static flex h-3.5 items-center rounded-lg px-4 opacity-10'),
    waterfallTitle: cn(base.barBase, 'static h-1.5 rounded'),
    waterfallMeta: cn(base.barBase, 'static h-1.5 rounded opacity-20'),
  }
}
