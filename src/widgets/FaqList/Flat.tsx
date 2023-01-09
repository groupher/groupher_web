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

type TProps = Pick<TIndex, 'articles' | 'large'>

const Flat: FC<TProps> = ({ articles, large }) => {
  return (
    <Wrapper>
      <Header large={large}>
        <BrandText large={large}>常见问题</BrandText>
      </Header>
      <Content>
        {articles.map((item) => (
          <Section key={item.title} large={large}>
            <SectionHead>
              <CheckIconWrapper large={large}>
                <CheckIcon large={large} />
              </CheckIconWrapper>
              <Title large={large}>{item.title}</Title>
            </SectionHead>
            <Desc large={large}>{item.body}</Desc>
          </Section>
        ))}
      </Content>
    </Wrapper>
  )
}

export default memo(Flat)
