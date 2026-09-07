import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn, br, primary } = useTwBelt()
  const base = useBase()

  return {
    block: 'column w-full px-1 py-3 justify-center',
    grid: 'grid w-full grid-cols-3 gap-3',
    card: cn('column rounded-lg border px-3 pt-2.5 pb-1.5', br('divider')),
    icon: cn('size-4 opacity-55', primary('fill')),
    title: cn(base.barBase, 'static h-1 w-8 opacity-50 mb-1.5 mt-1.5'),
    desc: cn(base.barBase, 'static h-0.5 w-6 opacity-30 mb-1'),
    descBase: cn(base.barBase, 'static h-0.5 opacity-30 mb-1'),
    footer: 'row-center mt-2 gap-x-1',
    circle: cn(base.circleBase, 'size-2 opacity-20'),
    meta: cn(base.barBase, 'h-1 w-4 opacity-25'),
  }
}
