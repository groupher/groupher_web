import { FC } from 'react'

import type { TCommunity, TMetric, TEnableConfig, TThread } from '@/spec'

import { ANCHOR } from '@/constant/dom'
import { ROUTE } from '@/constant/route'

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
  enable: TEnableConfig
  activeThread: TThread
}

const Header: FC<TProps> = ({ metric, community, enable, activeThread }) => {
  const publicThreads = community.threads.filter((thread) => enable[thread.raw])

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
          <MobileThreadNavi community={community} threads={publicThreads} active={activeThread} />
        </MobileNaviWrapper>

        <Account>
          <AccountIcon />
        </Account>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Header
