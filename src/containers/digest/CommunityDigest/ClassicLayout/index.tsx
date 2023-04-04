import { FC, memo } from 'react'
import Router from 'next/router'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TThread, TCommunity, TMetric, TEnableConfig } from '@/spec'

import { sortByIndex } from '@/utils/helper'

import { SpaceGrow } from '@/widgets/Common'
import TabBar from '@/widgets/TabBar'
import ViewportTracker from '@/widgets/ViewportTracker'

import CommunityBrief from './CommunityBrief'
// import AccountUnit from './AccountUnit'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
  TabBarWrapper,
  CustomPart,
} from '../styles/classic_layout'

import { setViewport } from '../logic'

// 没有各种外链接，打赏信息等的官方社区
// const NON_STANDARD_COMMUNITIES = [HCN, 'feedback']

type TProps = {
  community: TCommunity
  activeThread: TThread
  metric: TMetric
  enable: TEnableConfig
}

const ClassicLayout: FC<TProps> = ({ community, activeThread, metric, enable }) => {
  const { isMobile } = useMobileDetect()
  const publicThreads = sortByIndex(community.threads.filter((thread) => enable[thread.raw]))

  return (
    <Wrapper testid="community-digest" isMobile={isMobile}>
      <InnerWrapper metric={metric} isMobile={isMobile}>
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief community={community} />
          </CommunityBaseInfo>

          <SpaceGrow />
          <TabBarWrapper>
            <TabBar
              source={publicThreads}
              onChange={(path) => {
                Router.push(`/home/${path}`)
              }}
              active={activeThread}
              communityRaw={community.raw}
            />
            <SpaceGrow />
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <CustomPart>🔥 我们在招人!</CustomPart>
          </TabBarWrapper>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={() => setViewport(true)} onLeave={() => setViewport(false)} />
    </Wrapper>
  )
}

export default memo(ClassicLayout)
