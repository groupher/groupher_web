import { FC } from 'react'

import { ROUTE, SOCIAL_LIST } from '@/constant'
import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  BrandInfo,
  BrandText,
  LinksInfo,
  LinkItem,
  SocialInfo,
} from '../styles/desktop_view/simple_layout'

const SimpleLayout: FC = () => {
  return (
    <Wrapper>
      <BrandInfo>
        <BrandText>Groupher</BrandText>
      </BrandInfo>
      <LinksInfo>
        <LinkItem href={ROUTE.POST}>讨论</LinkItem>
        <LinkItem href={ROUTE.KANBAN}>看板</LinkItem>
        <LinkItem href={ROUTE.CHANGELOG}>更新日志</LinkItem>
        <LinkItem href={ROUTE.HELP}>帮助台</LinkItem>
        <LinkItem href={ROUTE.ABOUT}>关于</LinkItem>
      </LinksInfo>
      <SocialInfo>
        <SocialList selected={[SOCIAL_LIST.HOMEPAGE, SOCIAL_LIST.TWITTER, SOCIAL_LIST.BOSS]} />
      </SocialInfo>
    </Wrapper>
  )
}

export default SimpleLayout
