import useTwBelt from '~/hooks/useTwBelt'

import useBase from '../../../useDsbSalon'

export default function useSalon() {
  const { cn, br, bg, avatar } = useTwBelt()
  const base = useBase()

  return {
    wrapper: cn(
      'p-5 pl-7 rounded-md w-full mt-7 border border-transparent',
      `hover:${br('divider')}`,
      bg('sandBox'),
    ),

    select: 'row-center wrap w-full -ml-2',
    block: base.cardRecipe('w-72 h-24 scale-90'),
    fullBlock: cn(base.cardBase, 'w-72 h-24 scale-90'),
    fullBlockActive: base.cardActiveDecoration,
    layout: 'column-align-both w-1/2',
    frame: 'column s-full',
    header: 'column gap-2',
    headerRow: 'row-center justify-between gap-4',
    footer: 'row-center mt-auto justify-between',
    footerLeft: 'row-center gap-3',
    footerRight: 'row-center gap-2',
    barBase: cn(base.barBase, 'static'),
    icon: cn(base.iconBase, 'static size-5'),
    commentIcon: cn(base.iconBase, 'static size-3.5 mt-0.5'),
    avatarList: 'row-center gap-1 mt-0.5 -ml-1.5',
    userAvatar: cn(base.barBase, 'static size-4', avatar()),
    bar: cn(base.barBase, 'static h-1.5 w-20 opacity-40'),
    titleBar: 'h-1.5 w-16 opacity-30',
    bodyBar: 'w-28 h-2.5 opacity-40',
    sideBar: 'h-1.5 w-10 opacity-20',
    simpleMetric: 'h-1.5 w-10 opacity-30',
    tinyMetric: 'h-1.5 w-4 opacity-20',
    circle: cn(base.circleBase, 'opacity-40'),
  }
}
