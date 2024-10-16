import { COLOR_NAME } from '~/const/colors'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, rainbow, fill } = useTwBelt()

  const turnning = 'opacity-30 saturate-50'

  return {
    wrapper: cn('absolute w-full h-full top-0 left-0'),
    curveLineTL: cn('absolute size-80 top-24 left-60', turnning),
    curveLineBL: cn('absolute size-80 bottom-20 left-60 ml-2', turnning),
    //
    curveLineTR: cn('absolute size-80 top-24 right-48', turnning),
    curveLineBR: cn('absolute size-80 bottom-20 right-44', turnning),
    fillPurple: rainbow(COLOR_NAME.PURPLE, 'fill'),
    fillDigest: fill('text.digest'),
    //
    shapeIcon: cn('size-5 absolute opacity-30'),
    fillGreen: rainbow(COLOR_NAME.GREEN, 'fill'),
    fillRed: rainbow(COLOR_NAME.RED, 'fill'),
    fillOrange: rainbow(COLOR_NAME.ORANGE, 'fill'),
    squareIcon: cn('size-4 absolute rounded rotate-45 opacity-30', rainbow(COLOR_NAME.GREEN, 'bg')),
  }
}
