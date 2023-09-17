import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TThread, TCommunity, TMetric, TDashboardThreadConfig, THeaderLayout } from '@/spec'
import { ANCHOR } from '@/constant/dom'
import useHeaderLinks from '@/hooks/useHeaderLinks'

import { washThreads } from '@/utils/helper'

import ViewportTracker from '@/widgets/ViewportTracker'
import MobileThreadNavi from '@/widgets/MobileThreadNavi'
import { SpaceGrow } from '@/widgets/Common'
import { HEADER_LAYOUT } from '@/constant/layout'

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

type TProps = {
  community: TCommunity
  activeThread: TThread
  metric: TMetric
  dashboardSettings: TDashboardThreadConfig
  headerLayout: THeaderLayout
}

const SimpleLayout: FC<TProps> = ({
  community,
  activeThread,
  metric,
  dashboardSettings,
  headerLayout,
}) => {
  const washedThreads = washThreads(community.threads, dashboardSettings)
  const { links: extraLinks } = useHeaderLinks()

  return (
    <Wrapper
      id={ANCHOR.GLOBAL_HEADER_ID}
      testid="community-digest"
      metric={metric}
      headerLayout={headerLayout}
    >
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
            {headerLayout === HEADER_LAYOUT.RIGHT && <SpaceGrow />}
            <ThreadTab
              threads={washedThreads}
              active={activeThread}
              extraLinks={extraLinks}
              headerLayout={headerLayout}
              left={headerLayout === HEADER_LAYOUT.CENTER ? 4 : 0}
              right={headerLayout === HEADER_LAYOUT.RIGHT ? 20 : 0}
            />
            <AccountUnit community={community} />
          </CommunityBaseInfo>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={() => setViewport(true)} onLeave={() => setViewport(false)} />
    </Wrapper>
  )
}

export default observer(SimpleLayout)
