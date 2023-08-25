/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { bond } from '@/utils/mobx'

import CommunityDigest from '@/containers/digest/CommunityDigest'
import DashboardThread from '@/containers//thread/DashboardThread'

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
}

/**
 * only for AboutThread, but link to the common communityContent store
 */
const DashboardContainer: FC<TProps> = ({ communityContent: store }) => {
  useInit(store)

  const { isMobile } = useMobileDetect()

  return (
    <Wrapper testid="dashboard-thread-content">
      <CommunityDigest metric="DASHBOARD" />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <DashboardThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper>
          <ContentWrapper>
            <DashboardThread />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </Wrapper>
  )
}

export default bond(DashboardContainer, 'communityContent') as FC<TProps>
