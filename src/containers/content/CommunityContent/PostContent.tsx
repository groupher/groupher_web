/*
 * CommunityContent
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { BANNER_LAYOUT } from '@/constant/layout'
// import { THREAD } from '@/constant/thread'
import useMetric from '@/hooks/useMetric'
import useBannerLayout from '@/hooks/useBannerLayout'

import PostThread from '@/containers//thread/PostThread'
import CommunityDigest from '@/widgets/CommunityDigest'
import { Br } from '@/widgets/Common'
// import SidebarLayoutHeader from '@/widgets/SidebarLayoutHeader'

import { useStore } from './store'
import { useInit } from './logic'

import { Wrapper, SidebarWrapper, InnerWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

/**
 * only for AboutThread, but link to the common communityContent store
 */
const PostContent: FC = () => {
  const store = useStore()
  useInit(store)
  const metric = useMetric()
  const bannerLayout = useBannerLayout()

  const { isMobile } = store

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="post-thread-content" metric={metric}>
      <CommunityDigest />

      {isMobile && (
        <MobileCardsWrapper>
          <ContentWrapper>
            <PostThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      )}

      {!isMobile && (
        <InnerWrapper metric={metric} $bannerLayout={bannerLayout}>
          <ContentWrapper>
            {isSidebarLayout && <Br top={20} />}
            <PostThread />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default observer(PostContent)
