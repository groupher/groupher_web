import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn } = useTwBelt()
  const base = useBase()

  return {
    block: 'column s-full px-2.5 py-3 justify-center',
    grid: 'grid w-full grid-cols-3 items-start gap-6 h-full',
    column: 'column w-full min-w-0 gap-0 self-start overflow-hidden',
    centerColumn: 'column w-full min-w-0 gap-0 self-start overflow-hidden',
    rightColumn: 'column w-full min-w-0 gap-0 self-start overflow-hidden',
    group: 'column w-full min-w-0 gap-1.5',
    columnGap: 'h-4',
    titleLg: cn(base.barBase, 'static h-1 w-8 opacity-40'),
    titleMd: cn(base.barBase, 'static h-1 w-10 opacity-40'),
    titleSm: cn(base.barBase, 'static h-1 w-4 opacity-40'),
    entry: 'flex w-full min-w-0 items-center gap-1.5 overflow-hidden',
    entryLabelLg: cn(base.barBase, 'static h-1 w-6 shrink-0 opacity-22'),
    entryLabelMd: cn(base.barBase, 'static h-1 w-5 shrink-0 opacity-20'),
    entryLine: cn(base.barBase, 'static h-px min-w-0 grow opacity-12'),
    entryNum: cn(base.barBase, 'static h-1 w-1.5 shrink-0 opacity-20'),
  }
}
