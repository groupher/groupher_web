import type { FC } from 'react'

import { Space } from '~/widgets/Common'

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
  const space = 35

  return (
    <Wrapper>
      <Card>
        <Cover>
          <XIcon />
        </Cover>
        <Content>
          <Url>https://motuojie.com</Url>
          <Title>Motojie - (摩界)</Title>
          <Url>发现复古摩托车的魅力。我们专..</Url>
        </Content>
      </Card>
      <Footer>
        <CommentIcon />
        <Count>12</Count>
        <Space right={space} />
        <HeartIcon />
        <Count>29</Count>
        <Space right={space} />
        <RetweetIcon />
        <Count>8</Count>
        <Space right={space} />
        <ViewIcon />
        <Count>2948</Count>
        <Space right={space} />
        <MarkIcon />
      </Footer>
    </Wrapper>
  )
}

export default TwitterCard
