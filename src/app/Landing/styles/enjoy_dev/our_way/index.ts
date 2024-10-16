import { COLOR_NAME } from '~/const/colors'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, rainbow } = useTwBelt()

  return {
    wrapper: cn('row-center-between relative h-[680px] w-[1000px] mt-2.5 px-10'),
    connectLine: cn(
      'w-12 h-0.5 border-b-2 border-dashed opacity-30',
      rainbow(COLOR_NAME.BLACK, 'border'),
    ),
    seedIcon: cn(
      'size-4 opacity-65 hover:scale-125 trans-all-200 mr-2',
      rainbow(COLOR_NAME.GREEN, 'fill'),
    ),
    tadaIcon: cn('size-4 opacity-65 hover:scale-125 ml-2 trans-all-200'),
  }
}
