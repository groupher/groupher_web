import { FC, memo } from 'react'

import type { TThread, TCommunity, TMetric, TDashboardThreadConfig } from '@/spec'
import { ANCHOR } from '@/constant/dom'

import { washThreads } from '@/utils/helper'

import ViewportTracker from '@/widgets/ViewportTracker'
import MobileThreadNavi from '@/widgets/MobileThreadNavi'

import ThreadTab from './ThreadTab'
import CommunityBrief from './CommunityBrief'
import AccountUnit from './AccountUnit'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
  MobileNaviWrapper,
} from '../styles/simple_layout'

import { setViewport } from '../logic'

// 没有各种外链接，打赏信息等的官方社区
// const NON_STANDARD_COMMUNITIES = [HCN, 'feedback']

type TProps = {
  community: TCommunity
  activeThread: TThread
  metric: TMetric
  dashboardSettings: TDashboardThreadConfig
}

const SimpleLayout: FC<TProps> = ({ community, activeThread, metric, dashboardSettings }) => {
  const washedThreads = washThreads(community.threads, dashboardSettings)
  const { extraLinks } = dashboardSettings

  return (
    <Wrapper testid="community-digest" id={ANCHOR.GLOBAL_HEADER_ID}>
      <InnerWrapper metric={metric}>
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief community={community} />
            <MobileNaviWrapper>
              <MobileThreadNavi
                community={community}
                threads={washedThreads}
                active={activeThread}
              />
            </MobileNaviWrapper>
            <ThreadTab threads={washedThreads} active={activeThread} extraLinks={extraLinks} />
            <AccountUnit community={community} />
          </CommunityBaseInfo>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={() => setViewport(true)} onLeave={() => setViewport(false)} />
    </Wrapper>
  )
}

export default memo(SimpleLayout)
