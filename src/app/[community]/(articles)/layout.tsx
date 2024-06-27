'use client'

import { BANNER_LAYOUT } from '~/const/layout'

import useMetric from '~/hooks/useMetric'
import useLayout from '~/hooks/useLayout'

import CommunityDigest from '~/widgets/CommunityDigest'

import { Wrapper, SidebarWrapper, InnerWrapper, ContentWrapper } from './styles'

export default ({ children }) => {
  const metric = useMetric()
  const { bannerLayout } = useLayout()

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper $testid="post-thread-content" metric={metric}>
      <CommunityDigest />

      <InnerWrapper metric={metric} $bannerLayout={bannerLayout}>
        <ContentWrapper>{children}</ContentWrapper>
      </InnerWrapper>
    </LayoutWrapper>
  )
}
