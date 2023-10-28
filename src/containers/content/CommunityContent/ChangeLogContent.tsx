/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import useMetric from '@/hooks/useMetric'
import useBannerLayout from '@/hooks/useBannerLayout'

import { bond } from '@/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'

import ChangelogThread from '@/containers/thread/ChangelogThread'
import CommunityDigest from '@/widgets/CommunityDigest'

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

  const { globalLayout } = store
  const { isMobile } = useMobileDetect()
  const LayoutWrapper = globalLayout.banner === BANNER_LAYOUT.SIDEBAR ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="changelog-thread-content" metric={metric}>
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <ChangelogThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper metric={metric} $bannerLayout={bannerLayout}>
          <ContentWrapper>
            <ChangelogThread />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
