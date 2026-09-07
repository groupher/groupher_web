import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn, primary } = useTwBelt()
  const base = useBase()

  return {
    block: 'column s-full px-4 py-3 justify-center',
    body: 'column w-full gap-1.5 px-3 py-2.5',
    title: cn(base.barBase, 'static h-1.5 w-8 opacity-40'),
    desc: cn(base.barBase, 'static h-1 w-28 opacity-22'),
    titleBase: cn(base.barBase, 'static h-1.5'),
    descBase: cn(base.barBase, 'static h-1'),
    cards: 'grid grid-cols-3 gap-3 pt-1',
    card: 'column gap-0.5',
    cover: cn('h-8 rounded-md opacity-20', primary('bg')),
    cardTitle: cn(base.barBase, 'static ml-0.5 h-1 w-8 mt-0.5 mb-0.5 opacity-50'),
    cardDesc: cn(base.barBase, 'static ml-0.5 mt-0.5 h-1 w-12 opacity-20'),
    cardTitleBase: cn(base.barBase, 'static ml-0.5 h-1 mt-0.5 mb-0.5'),
    cardDescBase: cn(base.barBase, 'static ml-0.5 mt-0.5 h-1'),
  }
}
