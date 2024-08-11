import { type FC, memo } from 'react'

import Markdown from '~/widgets/Markdown'

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
  Body,
} from './styles/flat'

import type { TProps as TIndex } from '.'

type TProps = Pick<TIndex, 'sections' | 'large'>

const Flat: FC<TProps> = ({ sections, large }) => {
  return (
    <Wrapper>
      <Header $large={large}>
        <BrandText $large={large}>常见问题</BrandText>
      </Header>
      <Content $large={large}>
        {sections.map((item) => (
          <Section key={item.title} $large={large}>
            <SectionHead>
              <CheckIconWrapper $large={large}>
                <CheckIcon $large={large} />
              </CheckIconWrapper>
              <Title $large={large}>{item.title}</Title>
            </SectionHead>
            <Body $large={large}>
              <Markdown>{item.body}</Markdown>
            </Body>
          </Section>
        ))}
      </Content>
    </Wrapper>
  )
}

export default memo(Flat)
