import { FC } from 'react'

import {
  Wrapper,
  LeftWrapper,
  BrandLogo,
  BrandText,
  CenterWrapper,
  LinkItem,
  RightWrapper,
  SocialIcon,
} from '../../styles/footer/templates/simple'

const Simple: FC = () => {
  return (
    <Wrapper>
      <LeftWrapper>
        <BrandLogo />
        <BrandText>Groupher</BrandText>
      </LeftWrapper>
      <CenterWrapper>
        <LinkItem>讨论</LinkItem>
        <LinkItem>看板</LinkItem>
        <LinkItem>更新日志</LinkItem>
        <LinkItem>帮助台</LinkItem>
        <LinkItem>关于</LinkItem>
      </CenterWrapper>
      <RightWrapper>
        <SocialIcon.Email />
        <SocialIcon.Twitter />
        <SocialIcon.Github />
      </RightWrapper>
    </Wrapper>
  )
}

export default Simple
