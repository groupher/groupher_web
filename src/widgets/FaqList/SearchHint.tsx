import { FC, memo } from 'react'

import { mockHelpCats } from '@/mock'
import { Br } from '@/widgets/Common'

import {
  Wrapper,
  Header,
  Title,
  Body,
  Section,
  CatSection,
  CatDesc,
  Item,
  CatItem,
  Footer,
  MoreLink,
} from './styles/search_hint'

import type { TProps as TIndex } from '.'

type TProps = Pick<TIndex, 'sections'>

const SearchHint: FC<TProps> = ({ sections }) => {
  const cats = mockHelpCats()

  return (
    <Wrapper>
      <Header>
        <Title>常见问题</Title>
      </Header>
      <Body>
        {sections.map((item) => (
          <Section key={item.title}>
            <Item>{item.title}</Item>
          </Section>
        ))}
      </Body>

      <Br bottom={40} />

      <Header>
        <Title>帮助文档</Title>
      </Header>
      <Br bottom={5} />
      <Body>
        {cats.map((item) => (
          <CatSection key={item.title} color={item.color}>
            <CatItem>{item.title}</CatItem>
            <CatDesc>{item.articles.length} 篇内容</CatDesc>
          </CatSection>
        ))}
      </Body>

      <Footer>
        <div>更多问题，请移步</div>
        <MoreLink>帮助台</MoreLink>。
      </Footer>
    </Wrapper>
  )
}

export default memo(SearchHint)
