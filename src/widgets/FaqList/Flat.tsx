import { FC, memo } from 'react'

import {
  Wrapper,
  Header,
  BrandText,
  Content,
  Section,
  SectionHead,
  CheckIconWrapper,
  CheckIcon,
  Title,
  Desc,
} from './styles/flat'

import type { TProps as TIndex } from './index'

type TProps = Pick<TIndex, 'articles'>

const Flat: FC<TProps> = ({ articles }) => {
  return (
    <Wrapper>
      <Header>
        <BrandText>常见问题</BrandText>
      </Header>
      <Content>
        {articles.map((item) => (
          <Section key={item.title}>
            <SectionHead>
              <CheckIconWrapper>
                <CheckIcon />
              </CheckIconWrapper>
              <Title>{item.title}</Title>
            </SectionHead>
            <Desc>{item.body}</Desc>
          </Section>
        ))}
      </Content>
    </Wrapper>
  )
}

export default memo(Flat)
