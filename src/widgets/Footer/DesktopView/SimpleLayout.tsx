import { FC } from 'react'

import { ROUTE } from '@/constant/route'
import { DEME_SOCIALS } from '@/constant/social'
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
        <BrandText href="/">Groupher</BrandText>
      </BrandInfo>
      <LinksInfo>
        <LinkItem href={`/${ROUTE.HOME}/${ROUTE.POST}`}>讨论</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}/${ROUTE.KANBAN}`}>看板</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}/${ROUTE.CHANGELOG}`}>更新日志</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}/${ROUTE.HELP}`}>帮助台</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}/${ROUTE.ABOUT}`}>关于</LinkItem>
      </LinksInfo>
      <SocialInfo>
        <SocialList selected={DEME_SOCIALS} />
      </SocialInfo>
    </Wrapper>
  )
}

export default SimpleLayout
