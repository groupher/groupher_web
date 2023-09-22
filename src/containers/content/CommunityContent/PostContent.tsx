/*
 * CommunityContent
 */

import { FC } from 'react'

import { bond } from '@/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'
// import { THREAD } from '@/constant/thread'
import useMetric from '@/hooks/useMetric'
import useBannerLayout from '@/hooks/useBannerLayout'

import ArticlesThread from '@/containers//thread/ArticlesThread'
import CommunityDigest from '@/widgets/CommunityDigest'
import { Br } from '@/widgets/Common'
// import SidebarLayoutHeader from '@/widgets/SidebarLayoutHeader'

import type { TStore } from './store'
import { useInit } from './logic'

import { Wrapper, SidebarWrapper, InnerWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

type TProps = {
  communityContent?: TStore
}

/**
 * only for AboutThread, but link to the common communityContent store
 */
const CommunityContentContainer: FC<TProps> = ({ communityContent: store }) => {
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
            <ArticlesThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      )}

      {!isMobile && (
        <InnerWrapper metric={metric} bannerLayout={bannerLayout}>
          <ContentWrapper>
            {isSidebarLayout && <Br top={20} />}
            <ArticlesThread />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
