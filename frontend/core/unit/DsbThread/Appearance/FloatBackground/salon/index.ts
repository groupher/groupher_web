import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const base = useBase()
  const { cn, shadow } = useTwBelt()

  return {
    wrapper: base.section,
    block: base.cardRecipe('row w-full h-44 p-0 overflow-hidden'),
    select: 'grid w-full grid-cols-1 gap-8 md:grid-cols-2',
    // The panel and popover choose their own tone at the call site. Keeping
    // the bar geometry here without a background avoids a cn-only bg conflict.
    bar: cn('rounded static h-2 opacity-40 z-10'),
    barToneLight: cn(base.barBase, 'static'),
    layout: 'column-align-both group w-full min-w-0',

    panel: 'column-start h-full w-1/2 px-5 pt-5 gap-3',
    lightPanel: 'bg-white',
    darkPanel: 'bg-black opacity-80',
    panelTitle: 'w-20 h-2.5 opacity-20',
    panelShort: 'w-12 opacity-20',
    panelWide: 'w-20 opacity-20',
    panelMid: 'w-16 opacity-20',
    panelNarrow: 'w-12 opacity-20',
    panelWideDim: 'w-20 opacity-10',

    popover: cn(
      'absolute h-20 opacity-95 w-30 rounded-md bg-black z-20 border border-dotted',
      shadow('md'),
    ),
    popoverBody: 'column-start px-5 pt-4 gap-2',
    popoverTitle: 'w-full opacity-30',
    popoverBodyWide: 'w-4/5 opacity-20',
    popoverBodyNarrow: 'w-1/2 opacity-20',
    popoverLight: 'bg-white',
    popoverDark: 'bg-black',
  }
}
