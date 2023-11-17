/*
 * CommunityContent
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import useMetric from '@/hooks/useMetric'
import DashboardThread from '@/containers//thread/DashboardThread'
import CommunityDigest from '@/widgets/CommunityDigest'

import { useStore } from './store'
import { useInit } from './logic'

import {
  Wrapper,
  InnerWrapper,
  ContentWrapper,
  MobileCardsWrapper,
} from './styles/dashboard_content'

/**
 * only for AboutThread, but link to the common communityContent store
 */
const DashboardContent: FC = () => {
  const store = useStore()
  useInit(store)
  const metric = useMetric()

  const { isMobile } = useMobileDetect()

  return (
    <Wrapper $testid="dashboard-thread-content">
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

export default observer(DashboardContent)
