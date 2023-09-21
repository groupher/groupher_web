/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'

import { bond } from '@/mobx'

import DashboardThread from '@/containers//thread/DashboardThread'
import CommunityDigest from '@/widgets/CommunityDigest'

import type { TStore } from './store'
import { useInit } from './logic'

import {
  Wrapper,
  InnerWrapper,
  ContentWrapper,
  MobileCardsWrapper,
} from './styles/dashboard_content'

type TProps = {
  communityContent?: TStore
  metric?: TMetric
}

/**
 * only for AboutThread, but link to the common communityContent store
 */
const DashboardContainer: FC<TProps> = ({ communityContent: store, metric = METRIC.DASHBOARD }) => {
  useInit(store)

  const { isMobile } = useMobileDetect()

  return (
    <Wrapper testid="dashboard-thread-content">
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <DashboardThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper metric={metric}>
          <ContentWrapper>
            <DashboardThread />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </Wrapper>
  )
}

export default bond(DashboardContainer, 'communityContent') as FC<TProps>
