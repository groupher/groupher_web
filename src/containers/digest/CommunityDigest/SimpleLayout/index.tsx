import { FC, memo } from 'react'

import type { TThread, TCommunity, TMetric, TEnableConfig } from '@/spec'
import EVENT from '@/constant/event'
import { send } from '@/utils/signal'

import { DesktopOnly } from '@/widgets/Common'
import ViewportTracker from '@/widgets/ViewportTracker'

import ThreadTab from './ThreadTab'
import CommunityBrief from './CommunityBrief'
import AccountUnit from './AccountUnit'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
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
  const publicThreads = community.threads.filter((thread) => enable[thread.raw])

  return (
    <Wrapper testid="community-digest">
      <InnerWrapper metric={metric}>
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief community={community} />
            <DesktopOnly>
              <ThreadTab
                threads={publicThreads}
                onChange={(data) => send(EVENT.COMMUNITY_THREAD_CHANGE, { data })}
                active={activeThread}
              />
            </DesktopOnly>
            <AccountUnit />
          </CommunityBaseInfo>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={() => setViewport(true)} onLeave={() => setViewport(false)} />
    </Wrapper>
  )
}

export default memo(SimpleLayout)
