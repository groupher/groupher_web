/*
 * CommunityContent
 */

import { FC } from 'react'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'

import { bond } from '@/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'
import { THREAD } from '@/constant/thread'

import ArticlesThread from '@/containers//thread/ArticlesThread'
import CommunityDigest from '@/widgets/CommunityDigest'
import SidebarLayoutHeader from '@/widgets/SidebarLayoutHeader'

import type { TStore } from './store'
import { useInit } from './logic'

import { Wrapper, SidebarWrapper, InnerWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

type TProps = {
  communityContent?: TStore
  metric?: TMetric
}

/**
 * only for AboutThread, but link to the common communityContent store
 */
const CommunityContentContainer: FC<TProps> = ({
  communityContent: store,
  metric = METRIC.COMMUNITY,
}) => {
  useInit(store)

  const { globalLayout, isMobile } = store

  const isSidebarLayout = globalLayout.banner === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="post-thread-content">
      <CommunityDigest />
      {isMobile && (
        <MobileCardsWrapper>
          <ContentWrapper>
            <ArticlesThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      )}

      {!isMobile && (
        <InnerWrapper metric={metric}>
          {isSidebarLayout && <SidebarLayoutHeader thread={THREAD.POST} />}
          <ContentWrapper>
            <ArticlesThread />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
