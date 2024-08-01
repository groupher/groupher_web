import { ANCHOR } from '~/const/dom'
import useHeaderLinks from '~/hooks/useHeaderLinks'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'
import useMetric from '~/hooks/useMetric'

import { HEADER_LAYOUT } from '~/const/layout'

import ViewportTracker from '~/widgets/ViewportTracker'
import { Row, SpaceGrow } from '~/widgets/Common'
import AccountUnit from '~/widgets/AccountUnit'

import ThreadTab from './ThreadTab'
import CommunityBrief from './CommunityBrief'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
} from '../styles/header_layout'

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
          <CommunityBaseInfo className="header-layout-community-brief">
            <CommunityBrief />

            {layout === HEADER_LAYOUT.RIGHT && <SpaceGrow />}
            <ThreadTab right={layout === HEADER_LAYOUT.RIGHT ? 20 : 0} />
            <Row>
              {/* <GithubItem href="/">
                <img
                  alt="GitHub Repo stars"
                  src="https://img.shields.io/github/stars/vercel/next.js?style=social&logo=github&label=%20%20&labelColor=black&color=white"
                />
              </GithubItem> */}
              <AccountUnit />
            </Row>
          </CommunityBaseInfo>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={enterView} onLeave={leaveView} />
    </Wrapper>
  )
}
