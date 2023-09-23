import { FC } from 'react'
import { observer } from 'mobx-react'
import Router from 'next/router'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import useMetric from '@/hooks/useMetric'
import usePublicThreads from '@/hooks/usePublicThreads'
import useViewingThread from '@/hooks/useViewingThread'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import { SpaceGrow } from '@/widgets/Common'
import TabBar from '@/widgets/TabBar'
import ViewportTracker from '@/widgets/ViewportTracker'
import SearchBox from '@/widgets/SearchBox'

import CommunityBrief from './CommunityBrief'
// import AccountUnit from './AccountUnit'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
  TabBarWrapper,
} from '../styles/classic_layout'

// 没有各种外链接，打赏信息等的官方社区
// const NON_STANDARD_COMMUNITIES = [HCN, 'feedback']

const ClassicLayout: FC = () => {
  const metric = useMetric()
  const { isMobile } = useMobileDetect()
  const { enterView, leaveView } = useCommunityDigestViewport()
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
              onChange={(path) => Router.push(`/${community.slug}/${path}`)}
              active={activeThread}
              communitySlug={community.slug}
            />
            <SpaceGrow />
            <SearchBox right={-14} />
          </TabBarWrapper>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={enterView} onLeave={leaveView} />
    </Wrapper>
  )
}

export default observer(ClassicLayout)
