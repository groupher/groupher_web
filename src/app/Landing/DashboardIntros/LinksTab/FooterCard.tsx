import { FC } from 'react'

import {
  Wrapper,
  Links,
  LinkTitle,
  LinkName,
  Brand,
  Title,
  Desc,
  CommunityLogo,
  Contract,
  Icon,
} from '../../styles/dashboard_intros/links_tab/footer_card'

const FooterCard: FC = () => {
  return (
    <Wrapper>
      <Brand>
        <CommunityLogo />
        <Title>Tiki-taka</Title>
        <Desc>Visca Barca Visca Catalunya!</Desc>
        <Contract>
          <Icon.Wechat />
          <Icon.Twitter />
          <Icon.Zhihu />
        </Contract>
      </Brand>
      <Links>
        <LinkTitle>核心</LinkTitle>
        <LinkName>梅西</LinkName>
        <LinkName>哈维</LinkName>
        <LinkName>小白</LinkName>
        <LinkName>布教授</LinkName>
        <LinkName>皮看穿</LinkName>
      </Links>
      <Links>
        <LinkTitle>荣誉室</LinkTitle>
        <LinkName>西甲</LinkName>
        <LinkName>国王杯</LinkName>
        <LinkName>欧冠</LinkName>
        <LinkName>世俱杯</LinkName>
      </Links>
      <Links>
        <LinkTitle>开发者</LinkTitle>
        <LinkName>瓜帅</LinkName>
        <LinkName>克鲁伊夫</LinkName>
      </Links>
    </Wrapper>
  )
}

export default FooterCard
