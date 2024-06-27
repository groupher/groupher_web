import { ANCHOR } from '~/const/dom'
import useHeaderLinks from '~/hooks/useHeaderLinks'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'
import useMetric from '~/hooks/useMetric'

import ViewportTracker from '~/widgets/ViewportTracker'
// import MobileThreadNavi from '~/widgets/MobileThreadNavi'
import { SpaceGrow } from '~/widgets/Common'
import AccountUnit from '~/widgets/AccountUnit'

import CommunityBrief from './CommunityBrief'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
} from '../styles/dashboard_layout'

export default () => {
  const metric = useMetric()
  const { layout } = useHeaderLinks()
  const { enterView, leaveView } = useCommunityDigestViewport()

  return (
    <Wrapper
      id={ANCHOR.GLOBAL_HEADER_ID}
      $testid="community-digest"
      metric={metric}
      $headerLayout={layout}
    >
      <InnerWrapper metric={metric}>
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief />
            <SpaceGrow />
            <AccountUnit />
          </CommunityBaseInfo>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={enterView} onLeave={leaveView} />
    </Wrapper>
  )
}
