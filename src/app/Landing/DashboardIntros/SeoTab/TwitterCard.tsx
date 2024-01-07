import { FC } from 'react'

import { Space } from '@/widgets/Common'

import {
  Wrapper,
  Card,
  Url,
  Title,
  Cover,
  XIcon,
  Content,
  Footer,
  CommentIcon,
  HeartIcon,
  RetweetIcon,
  ViewIcon,
  MarkIcon,
  Count,
} from '../../styles/dashboard_intros/seo_tab/twitter_card'

const TwitterCard: FC = () => {
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
      <Footer>
        <CommentIcon />
        <Count>12</Count>
        <Space right={55} />
        <HeartIcon />
        <Count>29</Count>
        <Space right={55} />
        <RetweetIcon />
        <Count>8</Count>
        <Space right={55} />
        <ViewIcon />
        <Count>2948</Count>
        <Space right={55} />
        <MarkIcon />
      </Footer>
    </Wrapper>
  )
}

export default TwitterCard
