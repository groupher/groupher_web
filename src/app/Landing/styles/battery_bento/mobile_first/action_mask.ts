import useTwBelt from '~/hooks/useTwBelt'

import { COLOR_NAME } from '~/const/colors'
export { cn } from '~/css'

export default () => {
  const { cn, shadow, rainbow } = useTwBelt()

  return {
    wrapper: cn(
      'column-align-both px-1.5 py-2 pb-0 rounded-t-xl z-50',
      'absolute left-4 ml-0.5',
      'bg-htmlBg-dark brightness-150',
      'trans-jump',
      shadow('md'),
    ),
    fillOrange: rainbow(COLOR_NAME.ORANGE, 'fill'),
    top: 'row-center gap-x-1',
    actionBlock: cn('w-7 h-6 rounded-md align-both', 'bg-menuHoverBg-dark'),
    bottomActions: cn('mt-1 w-24 p-1.5 rounded-t-md grow', 'bg-menuHoverBg-dark'),
    //
    icon: 'size-3 fill-text-digest-dark opacity-80 saturate-50',
    menuItem: cn('row-center mb-2 mt-0.5 ml-0.5 text-xs', 'text-text-digest-dark'),
    bar: 'ml-2 w-10 h-1 rounded-md opacity-20 bg-text-digest-dark',
  }
}
