import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import dynamic from 'next/dynamic'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { ANCHOR } from '@/constant/dom'
import useHeaderLinks from '@/hooks/useHeaderLinks'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useMetric from '@/hooks/useMetric'

import { HEADER_LAYOUT } from '@/constant/layout'

import ViewportTracker from '@/widgets/ViewportTracker'
import MobileThreadNavi from '@/widgets/MobileThreadNavi'
import { Row, SpaceGrow } from '@/widgets/Common'
import AccountUnit from '@/widgets/AccountUnit'

import ThreadTab from './ThreadTab'
import CommunityBrief from './CommunityBrief'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  CommunityBaseInfo,
  MobileNaviWrapper,
  WatchIcon,
  // GithubItem,
} from '../styles/header_layout'

// export const CommunityBrief = dynamic(() => import('./CommunityBrief'), {
//   loading: () => <LavaLampLoading left={20} />,
//   ssr: false,
// })

const HeaderLayout: FC = () => {
  const metric = useMetric()
  const { layout: headerLayout } = useHeaderLinks()
  const { enterView, leaveView } = useCommunityDigestViewport()

  // return (
  //   <>
  //     <h3>this is h3</h3>
  //   </>
  // )

  return (
    <Wrapper
      id={ANCHOR.GLOBAL_HEADER_ID}
      $testid="community-digest"
      metric={metric}
      $headerLayout={headerLayout}
    >
      <InnerWrapper metric={metric}>
        <BannerContentWrapper>
          <CommunityBaseInfo>
            <CommunityBrief />

            <MobileNaviWrapper>
              <MobileThreadNavi />
            </MobileNaviWrapper>
            {headerLayout === HEADER_LAYOUT.RIGHT && <SpaceGrow />}
            <ThreadTab right={headerLayout === HEADER_LAYOUT.RIGHT ? 20 : 0} />
            <Row>
              {/* <GithubItem href="/">
                <img
                  alt="GitHub Repo stars"
                  src="https://img.shields.io/github/stars/vercel/next.js?style=social&logo=github&label=%20%20&labelColor=black&color=white"
                />
              </GithubItem> */}
              <WatchIcon />
              <AccountUnit />
            </Row>
          </CommunityBaseInfo>
        </BannerContentWrapper>
      </InnerWrapper>
      <ViewportTracker onEnter={enterView} onLeave={leaveView} />
    </Wrapper>
  )
}

export default observer(HeaderLayout)
