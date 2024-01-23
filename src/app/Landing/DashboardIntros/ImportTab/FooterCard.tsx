import { FC } from 'react'

import {
  Wrapper,
  Card,
  ImgIcon,
  EmailIcon,
  Title,
} from '../../styles/dashboard_intros/import_tab/footer_card'

const FooterCard: FC = () => {
  return (
    <Wrapper>
      <Card>
        <ImgIcon src="landing/seo/dingding.png" />
        <Title>钉钉</Title>
      </Card>
      <Card>
        <EmailIcon src="landing/seo/email.png" />
        <Title>邮件</Title>
      </Card>
      <Card>
        <ImgIcon src="landing/seo/rss.png" />
        <Title>RSS</Title>
      </Card>
      <Card>
        <ImgIcon src="landing/seo/wechat2.png" />
        <Title>微信</Title>
      </Card>
    </Wrapper>
  )
}

export default FooterCard
