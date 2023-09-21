import { FC } from 'react'
import { observer } from 'mobx-react'

import { ANCHOR } from '@/constant/dom'
import useHeaderLinks from '@/hooks/useHeaderLinks'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useMetric from '@/hooks/useMetric'

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

const SimpleLayout: FC = () => {
  const metric = useMetric()
  const { layout: headerLayout } = useHeaderLinks()
  const { enterView, leaveView } = useCommunityDigestViewport()

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
            <CommunityBrief />
            <MobileNaviWrapper>
              <MobileThreadNavi />
            </MobileNaviWrapper>
            {headerLayout === HEADER_LAYOUT.RIGHT && <SpaceGrow />}
            <ThreadTab
              left={headerLayout === HEADER_LAYOUT.CENTER ? 4 : 0}
              right={headerLayout === HEADER_LAYOUT.RIGHT ? 20 : 0}
            />
            <AccountUnit />
          </CommunityBaseInfo>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={enterView} onLeave={leaveView} />
    </Wrapper>
  )
}

export default observer(SimpleLayout)
