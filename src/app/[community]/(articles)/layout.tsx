'use client'

import { observer } from 'mobx-react-lite'

import { BANNER_LAYOUT } from '@/const/layout'

import useMetric from '@/hooks/useMetric'
import useBannerLayout from '@/hooks/useBannerLayout'

import CommunityDigest from '@/widgets/CommunityDigest'

import { Wrapper, SidebarWrapper, InnerWrapper, ContentWrapper } from './styles'

const Layout = ({ children }) => {
  const metric = useMetric()

  const bannerLayout = useBannerLayout()
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

export default observer(Layout)
