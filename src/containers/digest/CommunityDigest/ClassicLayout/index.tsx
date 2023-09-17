import { FC } from 'react'
import { observer } from 'mobx-react'
import Router from 'next/router'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TMetric } from '@/spec'
import usePublicThreads from '@/hooks/usePublicThreads'
import useViewingThread from '@/hooks/useViewingThread'
import useViewingCommunity from '@/hooks/useViewingCommunity'

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
  metric: TMetric
}

const ClassicLayout: FC<TProps> = ({ metric }) => {
  const { isMobile } = useMobileDetect()
  // const { links: extraLinks, layout: headerLayout } = useHeaderLinks()
  const publicThreads = usePublicThreads()
  const activeThread = useViewingThread()
  const community = useViewingCommunity()

  return (
    <Wrapper testid="community-digest" isMobile={isMobile}>
      <InnerWrapper metric={metric} isMobile={isMobile}>
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief />
          </CommunityBaseInfo>
          <SpaceGrow />
          <TabBarWrapper>
            <TabBar
              source={publicThreads}
              onChange={(path) => {
                Router.push(`/${community.slug}/${path}`)
              }}
              active={activeThread}
              communitySlug={community.slug}
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

export default observer(ClassicLayout)
