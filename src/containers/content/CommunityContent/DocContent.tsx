/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { bond } from '@/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'
import { THREAD } from '@/constant/thread'

import useBannerLayout from '@/hooks/useBannerLayout'
import DocThread from '@/containers//thread/DocThread'
import CommunityDigest from '@/widgets/CommunityDigest'
import SidebarLayoutHeader from '@/widgets/SidebarLayoutHeader'

import type { TStore } from './store'
import { useInit } from './logic'

import { Wrapper, InnerWrapper, SidebarWrapper, ContentWrapper, MobileCardsWrapper } from './styles'
import useMetric from '@/hooks/useMetric'

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
  const { isMobile } = useMobileDetect()

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="doc-thread-content">
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <DocThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper metric={metric} bannerLayout={bannerLayout}>
          {isSidebarLayout && <SidebarLayoutHeader thread={THREAD.DOC} />}
          <ContentWrapper>
            <DocThread isSidebarLayout={bannerLayout === BANNER_LAYOUT.SIDEBAR} />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
