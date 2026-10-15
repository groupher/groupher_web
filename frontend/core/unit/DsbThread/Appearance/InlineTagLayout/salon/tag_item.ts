import { COLOR } from '~/const/colors'
import useInlineTagSalon from '~/hooks/useInlineTagSalon'
import type { TColor, TInlineTagLayout } from '~/spec'

type TProps = { layout: TInlineTagLayout } & TColor

export default function useSalon({ color = COLOR.BLACK, layout }: TProps) {
  const inlineTagSalon = useInlineTagSalon({ color, layout })

  return {
    wrapper: inlineTagSalon.wrapper,
    title: inlineTagSalon.title,
  }
}
