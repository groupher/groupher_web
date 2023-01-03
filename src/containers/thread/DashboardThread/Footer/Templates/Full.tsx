import { FC } from 'react'

import type { TActive } from '@/spec'
import { FOOTER_LAYOUT } from '@/constant'

import {
  Wrapper,
  LeftWrapper,
  BrandWrapper,
  BrandLogo,
  BrandText,
  Desc,
  CenterWrapper,
  LinkItem,
  SocialWrapper,
  SocialIcon,
} from '../../styles/footer/templates/full'
import { edit } from '../../logic'

type TProps = TActive

const Full: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper $active={$active} onClick={() => edit(FOOTER_LAYOUT.FULL, 'footerLayout')}>
      <LeftWrapper>
        <BrandWrapper>
          <BrandLogo />
          <BrandText>Groupher</BrandText>
        </BrandWrapper>
        <Desc>一站式反馈社区解决方案，您产品的公共论坛，看板，更新日志，帮助中心...</Desc>
        <SocialWrapper>
          <SocialIcon.Email />
          <SocialIcon.Twitter />
          <SocialIcon.Github />
        </SocialWrapper>
      </LeftWrapper>
      <CenterWrapper>
        <LinkItem>讨论</LinkItem>
        <LinkItem>看板</LinkItem>
        <LinkItem>更新日志</LinkItem>
        <LinkItem>帮助台</LinkItem>
        <LinkItem>关于</LinkItem>
      </CenterWrapper>
    </Wrapper>
  )
}

export default Full
