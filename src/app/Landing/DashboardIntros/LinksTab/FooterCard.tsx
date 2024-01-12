import { FC } from 'react'

import {
  Wrapper,
  Card,
  Url,
  Title,
  Cover,
  XIcon,
  Content,
} from '../../styles/dashboard_intros/links_tab/footer_card'

const FooterCard: FC = () => {
  return (
    <Wrapper>
      <Card>
        <Cover>
          <XIcon />
        </Cover>
        <Content>
          <Url>https://motuojie.com</Url>
          <Title>Motojie - (摩界)</Title>
          <Url>发现复古摩托车的魅力。我们专注于提供全球最独特、最经典的复古摩托车信息..</Url>
        </Content>
      </Card>
    </Wrapper>
  )
}

export default FooterCard
