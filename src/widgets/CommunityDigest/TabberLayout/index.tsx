import type { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { BRAND_LAYOUT } from '@/const/layout'

import useMetric from '@/hooks/useMetric'
import usePublicThreads from '@/hooks/usePublicThreads'
import useViewingThread from '@/hooks/useViewingThread'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useHeaderLinks from '@/hooks/useHeaderLinks'
import useBrandLayout from '@/hooks/useBrandLayout'

import { SpaceGrow } from '@/widgets/Common'
import TabBar from '@/widgets/TabBar'
import ViewportTracker from '@/widgets/ViewportTracker'
import SearchBox from '@/widgets/SearchBox'
import CustomHeaderLinks from '@/widgets/CustomHeaderLinks'

import CommunityBrief from './CommunityBrief'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
  TabBarWrapper,
} from '../styles/tabber_layout'

// 没有各种外链接，打赏信息等的官方社区
// const NON_STANDARD_COMMUNITIES = [HCN, 'feedback']

const TabberLayout: FC = () => {
  const router = useRouter()
  const metric = useMetric()
  const { isMobile } = useMobileDetect()
  const { enterView, leaveView } = useCommunityDigestViewport()
  const publicThreads = usePublicThreads()
  const activeThread = useViewingThread()
  const community = useViewingCommunity()
  const brandLayout = useBrandLayout()

  const { customLinks } = useHeaderLinks()

  return (
    <Wrapper
      $testid="community-digest"
      isMobile={isMobile}
      $minHeight={brandLayout !== BRAND_LAYOUT.BOTH}
    >
      <InnerWrapper
        metric={metric}
        isMobile={isMobile}
        $minHeight={brandLayout !== BRAND_LAYOUT.BOTH}
      >
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief />
          </CommunityBaseInfo>
          <SpaceGrow />
          <TabBarWrapper>
            <TabBar
              source={publicThreads}
              onChange={(path) => router.push(`/${community.slug}/${path}`)}
              active={activeThread}
              withIcon
            />
            <CustomHeaderLinks links={customLinks} />
            <SpaceGrow />
            <SearchBox right={-14} />
          </TabBarWrapper>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={enterView} onLeave={leaveView} />
    </Wrapper>
  )
}

export default observer(TabberLayout)
