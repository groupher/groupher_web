import type { TColorName } from '~/spec'
import { COLOR_NAME } from '~/const/colors'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

type TProps = {
  bgColor?: TColorName
}

export default ({ bgColor }: TProps) => {
  const { cn, br, fg, bg, fill, shadow, rainbow } = useTwBelt()

  const softBg = bgColor ? rainbow(COLOR_NAME[bgColor], 'bgSoft') : ''
  const solidBg = bgColor ? rainbow(COLOR_NAME[bgColor], 'bg') : bg('text.digest')
  const titleColor = bgColor ? rainbow(COLOR_NAME[bgColor], 'fg') : fg('text.digest')
  const fillColor = bgColor ? rainbow(COLOR_NAME[bgColor], 'fill') : fill('text.digest')

  return {
    wrapper: cn(
      'column relative w-36 h-36 border p-1.5 z-50 rounded-2xl',
      br('divider'),
      bg('sandBox'),
      shadow('sm'),
      softBg,
    ),

    innerCard: cn(
      'column absolute bottom-0 left-0 w-full h-[110px] p-2.5 pt-5 border-t rounded-2xl',
      shadow('sm'),
      bg('htmlBg'),
      br('divider'),
    ),
    header: 'row-center px-2.5 pb-1 h-7 z-20',
    footer: 'align-both',
    text: cn('text-xs bold-sm', titleColor),

    headIcon: cn('size-3 mr-1.5', fillColor),
    attachIcon: cn('size-4 absolute right-2 -top-1 opacity-50', fillColor),
    //
    leftDot: cn('size-1.5 circle absolute -left-1 bottom-5 opacity-65 z-30', bg('text.digest')),
    rightDot: cn('size-1.5 circle absolute -right-1 opacity-65 z-30', solidBg),
    bar: cn('rounded-md w-16 h-1.5 mb-2 opacity-15', solidBg),
  }
}
