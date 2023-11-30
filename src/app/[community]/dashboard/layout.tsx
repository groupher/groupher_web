'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import useMetric from '@/hooks/useMetric'

import CommunityDigest from '@/widgets/CommunityDigest'

import { Wrapper as WrapperRoot, InnerWrapper, ContentWrapper } from './styles'

import { Wrapper, MainWrapper } from '@/containers/thread/DashboardThread/styles'
import SideMenu from '@/containers/thread/DashboardThread/SideMenu'

const Layout = ({ children }) => {
  const { curTab, touched } = useDashboardSettings()
  const metric = useMetric()

  return (
    <WrapperRoot $testid="dashboard-thread-content">
      <CommunityDigest />

      <InnerWrapper metric={metric}>
        <ContentWrapper>
          <Wrapper $testid="dashboard-thread" metric="COMMUNITY">
            <SideMenu curTab={curTab} touched={touched} />
            <MainWrapper>{children}</MainWrapper>
          </Wrapper>
        </ContentWrapper>
      </InnerWrapper>
    </WrapperRoot>
  )
}

export default observer(Layout)
