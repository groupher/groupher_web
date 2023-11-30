'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import useMetric from '@/hooks/useMetric'

import CommunityDigest from '@/widgets/CommunityDigest'

import { Wrapper, InnerWrapper, ContentWrapper, FrameWrapper, MainWrapper } from './styles'

import { useStore } from '@/containers//thread/DashboardThread/store'
import { useInit } from '@/containers//thread/DashboardThread/logic'

import SideMenu from '@/containers/thread/DashboardThread/SideMenu'

const Layout = ({ children }) => {
  const { curTab, touched } = useDashboardSettings()
  const metric = useMetric()

  const store = useStore()
  useInit(store)

  return (
    <Wrapper>
      <CommunityDigest />

      <InnerWrapper metric={metric}>
        <ContentWrapper>
          <FrameWrapper metric={metric}>
            <SideMenu curTab={curTab} touched={touched} />
            <MainWrapper>{children}</MainWrapper>
          </FrameWrapper>
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(Layout)
