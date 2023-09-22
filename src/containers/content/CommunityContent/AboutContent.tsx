/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import useBannerLayout from '@/hooks/useBannerLayout'

import { bond } from '@/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'

import AboutThread from '@/containers/thread/AboutThread'
import CommunityDigest from '@/widgets/CommunityDigest'

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

  const bannerLayout = useBannerLayout()
  const { isMobile } = useMobileDetect()

  const LayoutWrapper = bannerLayout === BANNER_LAYOUT.SIDEBAR ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="about-thread-content">
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <AboutThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper metric={metric} bannerLayout={bannerLayout}>
          <ContentWrapper>
            <AboutThread isSidebarLayout={bannerLayout === BANNER_LAYOUT.SIDEBAR} />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
