import { FC } from 'react'

import {
  Wrapper,
  Links,
  LinkName,
  Title,
  CommunityLogo,
  FakeAvatar,
} from '../../styles/dashboard_intros/links_tab/header_card'

const HeaderCard: FC = () => {
  return (
    <Wrapper>
      <Title>
        <CommunityLogo />
        Tiki-taka
      </Title>
      <Links>
        <LinkName>讨论</LinkName>
        <LinkName>看板</LinkName>
        <LinkName>更新日志</LinkName>
        <LinkName>游乐场</LinkName>
        <LinkName>价格</LinkName>
        <LinkName>更多</LinkName>
      </Links>
      <FakeAvatar />
    </Wrapper>
  )
}

export default HeaderCard
