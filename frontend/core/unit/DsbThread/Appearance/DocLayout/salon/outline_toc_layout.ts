import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn } = useTwBelt()
  const base = useBase()

  return {
    block: 'column s-full px-4 py-3 justify-center',
    list: 'column w-full gap-4 px-7 py-5',
    group: 'column gap-2',
    row: 'row-center gap-3',
    title: cn(base.barBase, 'static h-1 mb-0.5 opacity-50'),
    articleTitle: cn(base.barBase, 'static h-1 opacity-30'),
    line: cn(base.barBase, 'static h-px opacity-20 grow'),
    meta: cn(base.barBase, 'static h-1 opacity-20'),
  }
}
