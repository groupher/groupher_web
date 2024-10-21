import type { TColorName, TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = {
  color: TColorName | null
} & TSpace

export default ({ color, ...spacing }: TProps) => {
  const { cn, margin, primary, rainbow } = useTwBelt()

  const fgColor = color ? rainbow(color, 'fg') : primary('fg')
  const fillColor = color ? rainbow(color, 'fill') : primary('fill')

  return {
    wrapper: cn('row-center hover:underline', margin(spacing)),
    title: cn('text-sm', fgColor),
    arrowIcon: cn('size-3 ml-0.5 opacity-50', fillColor),
  }
}
