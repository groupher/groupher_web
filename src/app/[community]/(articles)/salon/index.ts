import { BANNER_LAYOUT } from '~/const/layout'

import useLayout from '~/hooks/useLayout'
import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn } = useTwBelt()

  const { bannerLayout } = useLayout()
  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR

  return {
    wrapper: cn(isSidebarLayout && 'row justify-between'),
    content: 'column w-full',
  }
}
