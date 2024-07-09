'use client'

import useMetric from '~/hooks/useMetric'

import CommunityDigest from '~/widgets/CommunityDigest'

import { Wrapper, InnerWrapper, ContentWrapper, FrameWrapper, MainWrapper } from './styles'

import SideMenu from '~/containers/thread/DashboardThread/SideMenu'

const Layout = ({ children }) => {
  const metric = useMetric()

  return (
    <Wrapper>
      <CommunityDigest />

      <InnerWrapper metric={metric}>
        <ContentWrapper>
          <FrameWrapper metric={metric}>
            <SideMenu />
            <MainWrapper>{children}</MainWrapper>
          </FrameWrapper>
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Layout
