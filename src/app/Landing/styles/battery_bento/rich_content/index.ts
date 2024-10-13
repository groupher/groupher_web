import { COLOR_NAME } from '~/const/colors'
import useTwBelt from '~/hooks/useTwBelt'

import useBase from '..'

export default () => {
  const { cn } = useTwBelt()
  const base = useBase()

  return {
    wrapper: cn(base.baseCard, base.gradient(COLOR_NAME.BLUE)),
    title: base.introTitle,
    desc: base.introDesc,
    footer: 'column w-full p-4 pt-0',
  }
}
