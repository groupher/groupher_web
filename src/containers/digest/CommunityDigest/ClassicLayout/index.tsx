import { FC, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TThread, TCommunity, TMetric } from '@/spec'
import EVENT from '@/constant/event'
import { send } from '@/utils/signal'

import TabBar from '@/widgets/TabBar'
import ViewportTracker from '@/widgets/ViewportTracker'

import CommunityBrief from './CommunityBrief'
import AccountUnit from './AccountUnit'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
  TabBarWrapper,
} from '../styles/classic_layout'

import { setViewport } from '../logic'

// 没有各种外链接，打赏信息等的官方社区
// const NON_STANDARD_COMMUNITIES = [HCN, 'feedback']

type TProps = {
  community: TCommunity
  activeThread: TThread
  metric: TMetric
}

const ClassicLayout: FC<TProps> = ({ community, activeThread, metric }) => {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper testid="community-digest" isMobile={isMobile}>
      <InnerWrapper metric={metric} isMobile={isMobile}>
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief community={community} />
            <AccountUnit />
          </CommunityBaseInfo>
          <TabBarWrapper>
            <TabBar
              source={community.threads}
              onChange={(data) => send(EVENT.COMMUNITY_THREAD_CHANGE, { data })}
              active={activeThread}
              communityRaw={community.raw}
            />
          </TabBarWrapper>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={() => setViewport(true)} onLeave={() => setViewport(false)} />
    </Wrapper>
  )
}

export default memo(ClassicLayout)
