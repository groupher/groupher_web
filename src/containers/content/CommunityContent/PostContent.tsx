/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { bond } from '@/utils/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'
import { THREAD } from '@/constant/thread'

import CommunityDigest from '@/containers/digest/CommunityDigest'
import ArticlesThread from '@/containers//thread/ArticlesThread'
import SidebarLayoutHeader from '@/widgets/SidebarLayoutHeader'

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

  const { globalLayout } = store
  const { isMobile } = useMobileDetect()

  const isSidebarLayout = globalLayout.banner === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="post-thread-content">
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <ArticlesThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper>
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
