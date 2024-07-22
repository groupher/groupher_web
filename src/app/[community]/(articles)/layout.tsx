'use client'

import { BANNER_LAYOUT } from '~/const/layout'

import useMetric from '~/hooks/useMetric'
import useLayout from '~/hooks/useLayout'

import CommunityDigest from '~/widgets/CommunityDigest'

import useSalon, { Wrapper, SidebarWrapper, InnerWrapper } from './styles'

export default ({ children }) => {
  const s = useSalon()

  const metric = useMetric()
  const { bannerLayout } = useLayout()

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper metric={metric}>
      <CommunityDigest />

      <InnerWrapper metric={metric} $bannerLayout={bannerLayout}>
        <div className={s.content}>{children}</div>
      </InnerWrapper>
    </LayoutWrapper>
  )
}
