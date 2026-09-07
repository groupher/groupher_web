import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn, primary } = useTwBelt()
  const base = useBase()

  return {
    block: 'column s-full px-1 py-1 justify-center',
    items: 'grid w-full grid-cols-3 gap-x-5 gap-y-3',
    item: 'row-start gap-2.5',
    iconBox: 'align-both size-4 rounded -mt-0.5',
    icon: cn('size-2.5', primary('fill')),
    copy: 'column gap-1',
    itemTitle: cn(base.barBase, 'static h-1 w-8 mb-0.5 opacity-50'),
    itemDesc: cn(base.barBase, 'static h-1 w-12 opacity-20'),
    itemDescWide: cn(base.barBase, 'static h-1 w-16 opacity-22'),
    itemTitleBase: cn(base.barBase, 'static h-1'),
    itemDescBase: cn(base.barBase, 'static h-1'),
  }
}
