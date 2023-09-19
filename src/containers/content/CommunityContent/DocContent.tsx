/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'

import { bond } from '@/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'
import { THREAD } from '@/constant/thread'

import CommunityDigest from '@/containers/digest/CommunityDigest'
import DocThread from '@/containers//thread/DocThread'
import SidebarLayoutHeader from '@/widgets/SidebarLayoutHeader'

import type { TStore } from './store'
import { useInit } from './logic'

import { Wrapper, InnerWrapper, SidebarWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

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

  const { globalLayout } = store
  const { isMobile } = useMobileDetect()

  const isSidebarLayout = globalLayout.banner === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="doc-thread-content">
      <CommunityDigest metric={metric} />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <DocThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper metric={metric}>
          {isSidebarLayout && <SidebarLayoutHeader thread={THREAD.DOC} />}
          <ContentWrapper>
            <DocThread isSidebarLayout={globalLayout.banner === BANNER_LAYOUT.SIDEBAR} />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
