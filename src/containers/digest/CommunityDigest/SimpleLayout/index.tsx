import { FC, memo } from 'react'

import type { TThread, TCommunity, TMetric, TEnableConfig, TCommunityThread } from '@/spec'
import EVENT from '@/constant/event'
import { ANCHOR } from '@/constant/dom'

import { send } from '@/utils/signal'
import { sortByIndex } from '@/utils/helper'

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
  enable: TEnableConfig
}

const SimpleLayout: FC<TProps> = ({ community, activeThread, metric, enable }) => {
  const publicThreads = sortByIndex(
    community.threads.filter((thread) => enable[thread.raw]),
  ) as TCommunityThread[]

  return (
    <Wrapper testid="community-digest" id={ANCHOR.GLOBAL_HEADER_ID}>
      <InnerWrapper metric={metric}>
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief community={community} />
            <MobileNaviWrapper>
              <MobileThreadNavi
                community={community}
                threads={publicThreads}
                active={activeThread}
              />
            </MobileNaviWrapper>
            <ThreadTab
              threads={publicThreads}
              active={activeThread}
              onChange={(data) => send(EVENT.COMMUNITY_THREAD_CHANGE, { data })}
            />
            <AccountUnit community={community} />
          </CommunityBaseInfo>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={() => setViewport(true)} onLeave={() => setViewport(false)} />
    </Wrapper>
  )
}

export default memo(SimpleLayout)
