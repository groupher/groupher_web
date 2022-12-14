import { FC } from 'react'

import { ROUTE } from '@/constant/route'
import SOCIAL_LIST from '@/constant/social'
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
        <SocialList
          selected={[
            {
              type: SOCIAL_LIST.HOMEPAGE,
              addr: 'https://groupher.com',
            },
            {
              type: SOCIAL_LIST.TWITTER,
              addr: 'https://twitter.com',
            },
            {
              type: SOCIAL_LIST.BOSS,
              addr: 'https://zhipin.com',
            },
          ]}
        />
      </SocialInfo>
    </Wrapper>
  )
}

export default SimpleLayout
