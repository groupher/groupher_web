/*
 * CommunityContent
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import useBannerLayout from '@/hooks/useBannerLayout'
import useMetric from '@/hooks/useMetric'

import { BANNER_LAYOUT } from '@/constant/layout'

import AboutThread from '@/containers/thread/AboutThread'
import CommunityDigest from '@/widgets/CommunityDigest'

import { useStore } from './store'
import { useInit } from './logic'

import { Wrapper, SidebarWrapper, InnerWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

/**
 * only for AboutThread, but link to the common communityContent store
 */
const AboutContent: FC = () => {
  const store = useStore()
  useInit(store)

  const metric = useMetric()
  const bannerLayout = useBannerLayout()
  const { isMobile } = useMobileDetect()

  const LayoutWrapper = bannerLayout === BANNER_LAYOUT.SIDEBAR ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="about-thread-content" metric={metric}>
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <AboutThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper metric={metric} $bannerLayout={bannerLayout}>
          <ContentWrapper>
            <AboutThread isSidebarLayout={bannerLayout === BANNER_LAYOUT.SIDEBAR} />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default observer(AboutContent)
