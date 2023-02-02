import { FC } from 'react'

import type { TCommunity, TMetric } from '@/spec'
import { ROUTE } from '@/constant/route'

import {
  Wrapper,
  Community,
  CommunityLogo,
  CommunityTitle,
  Main,
  LinkItem,
  Account,
  AccountIcon,
} from '../styles/desktop_view/header'

type TProps = {
  metric: TMetric
  community: TCommunity
}

const Header: FC<TProps> = ({ metric, community }) => {
  return (
    <Wrapper>
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
      <Account>
        <AccountIcon />
      </Account>
    </Wrapper>
  )
}

export default Header
