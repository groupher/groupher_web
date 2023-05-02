import { FC } from 'react'

import type { TCommunity, TMetric, TThread, TDashboardThreadConfig } from '@/spec'

import { ANCHOR } from '@/constant/dom'
import { ROUTE } from '@/constant/route'

import { washThreads } from '@/utils/helper'
import MobileThreadNavi from '@/widgets/MobileThreadNavi'

import {
  Wrapper,
  InnerWrapper,
  Community,
  CommunityLogo,
  CommunityTitle,
  Main,
  LinkItem,
  Account,
  AccountIcon,
  MobileNaviWrapper,
} from '../styles/mobile_view/header'

type TProps = {
  metric: TMetric
  community: TCommunity
  dashboardSettings: TDashboardThreadConfig
  activeThread: TThread
}

const Header: FC<TProps> = ({ metric, community, activeThread, dashboardSettings }) => {
  const washedThreads = washThreads(community.threads, dashboardSettings)

  return (
    <Wrapper id={ANCHOR.GLOBAL_HEADER_ID}>
      <InnerWrapper>
        <Community>
          <CommunityLogo src={community.logo} />
          <CommunityTitle>{community.title}</CommunityTitle>
        </Community>

        <Main metric={metric}>
          <LinkItem href={`/${community.raw}/${ROUTE.POST}`}>讨论区</LinkItem>
          <LinkItem href={`/${community.raw}/${ROUTE.KANBAN}`}>看板</LinkItem>
          <LinkItem href={`/${community.raw}/${ROUTE.CHANGELOG}`}>更新日志</LinkItem>
          <LinkItem href={`/${community.raw}/${ROUTE.HELP}`}>帮助台</LinkItem>
          <LinkItem href={`/${community.raw}/${ROUTE.ABOUT}`}>关于</LinkItem>
        </Main>

        <MobileNaviWrapper>
          <MobileThreadNavi community={community} threads={washedThreads} active={activeThread} />
        </MobileNaviWrapper>

        <Account>
          <AccountIcon />
        </Account>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Header
