import { BANNER_LAYOUT } from '~/const/layout'
import { POST_LAYOUT } from '~/const/layout'

import useLayout from '~/hooks/useLayout'
import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn } = useTwBelt()
  const { postLayout, bannerLayout } = useLayout()

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const isMasonary = postLayout === POST_LAYOUT.MASONRY

  const mainStyle = cn('w-full grow rounded-md mt-3 mr-12 pr-20 border-r border-divider')
  const sidebarStyle = cn('w-full grow', isMasonary ? 'px-[12%]' : 'px-[20%]')

  const layout = isSidebarLayout ? sidebarStyle : mainStyle

  return {
    wrapper: 'row w-full',
    filter: 'row-center mb-1.5 h-10',
    layout,
  }
}
