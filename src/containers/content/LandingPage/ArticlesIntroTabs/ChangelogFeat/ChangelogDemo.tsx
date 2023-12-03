import { FC } from 'react'

import {
  Wrapper,
  Header,
  Title,
  GreyTitle,
  Bar,
  GreyBar,
  Cover,
  TagsWrapper,
  Content,
  Divider,
  Footer,
  Previous,
  StarIcon,
  StarIcon2,
  StarIcon3,
} from '../../styles/articles_intro_tabs/changelog_feat/changelog_demo'

const ChangeLogDemo: FC = () => {
  return (
    <Wrapper>
      <StarIcon />
      <StarIcon2 />
      <StarIcon3 />
      <Header>
        <Title>
          <Bar height={12} width={100} right={10} /> v2.0
        </Title>

        <TagsWrapper>
          <Bar height={6} width={30} right={7} opacity={0.6} />
          <Bar height={6} width={30} opacity={0.4} />
        </TagsWrapper>
      </Header>
      <Cover />
      <Content>
        <Bar height={6} width={189} right={7} opacity={0.6} />
        <Bar height={6} width={100} opacity={0.3} />
      </Content>
      <Footer>
        <Bar height={6} width={30} opacity={0.8} />
        <Bar height={6} width={50} opacity={0.4} />
      </Footer>
      <Divider />
      <Previous>
        <Header>
          <GreyTitle>
            <GreyBar height={12} width={120} right={10} opacity={0.7} /> v1.0
          </GreyTitle>

          <TagsWrapper>
            <GreyBar height={6} width={50} right={7} opacity={0.3} />
            <GreyBar height={6} width={30} opacity={0.6} />
          </TagsWrapper>
        </Header>
      </Previous>
    </Wrapper>
  )
}

export default ChangeLogDemo
