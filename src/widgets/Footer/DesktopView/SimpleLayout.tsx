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
