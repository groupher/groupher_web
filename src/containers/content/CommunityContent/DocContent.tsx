/*
 * CommunityContent
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { BANNER_LAYOUT } from '@/constant/layout'
import useMetric from '@/hooks/useMetric'
import useBannerLayout from '@/hooks/useBannerLayout'
import DocThread from '@/containers//thread/DocThread'
import CommunityDigest from '@/widgets/CommunityDigest'

import { useStore } from './store'
import { useInit } from './logic'

import { Wrapper, InnerWrapper, SidebarWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

/**
 * only for AboutThread, but link to the common communityContent store
 */
const DocContent: FC = () => {
  const store = useStore()
  useInit(store)
  const metric = useMetric()

  const bannerLayout = useBannerLayout()
  const { isMobile } = useMobileDetect()

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper $testid="doc-thread-content" metric={metric}>
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <DocThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper metric={metric} $bannerLayout={bannerLayout}>
          <ContentWrapper>
            <DocThread />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default observer(DocContent)
