import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TMetric } from '@/spec'
import { assetSrc } from '@/helper'

import { ANCHOR } from '@/constant/dom'
import { ROUTE } from '@/constant/route'

import useViewingCommunity from '@/hooks/useViewingCommunity'
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
} from '../styles/desktop_view/header'

type TProps = {
  metric: TMetric
}

const Header: FC<TProps> = ({ metric }) => {
  const { slug, title, logo } = useViewingCommunity()

  return (
    <Wrapper id={ANCHOR.GLOBAL_HEADER_ID}>
      <InnerWrapper>
        <Community>
          <CommunityLogo src={assetSrc(logo)} />
          <CommunityTitle>{title}</CommunityTitle>
        </Community>

        <Main metric={metric}>
          <LinkItem href={`/${slug}/${ROUTE.POST}`}>讨论区</LinkItem>
          <LinkItem href={`/${slug}/${ROUTE.KANBAN}`}>看板</LinkItem>
          <LinkItem href={`/${slug}/${ROUTE.CHANGELOG}`}>更新日志</LinkItem>
          <LinkItem href={`/${slug}/${ROUTE.HELP}`}>帮助台</LinkItem>
          <LinkItem href={`/${slug}/${ROUTE.ABOUT}`}>关于</LinkItem>
        </Main>

        <MobileNaviWrapper>
          <MobileThreadNavi />
        </MobileNaviWrapper>

        <Account>
          <AccountIcon />
        </Account>
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(Header)
