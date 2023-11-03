import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { mockHelpCats } from '@/mock'
import { THREAD } from '@/constant/thread'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import ArrowLinker from '@/widgets/ArrowLinker'

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
} from './styles/search_hint'

import type { TProps as TIndex } from '.'

type TProps = Pick<TIndex, 'sections'>

const SearchHint: FC<TProps> = ({ sections }) => {
  const community = useViewingCommunity()
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

      <Body>
        {cats.map((item) => (
          <CatSection key={item.title} color={item.color}>
            <CatItem href="/">{item.title}</CatItem>
            <CatDesc>{item.articles.length} 篇内容</CatDesc>
          </CatSection>
        ))}
      </Body>

      <Footer>
        更多类似问题，请移步
        <ArrowLinker href={`/${community.slug}/${THREAD.DOC}`} fontSize={12} left={1}>
          帮助台
        </ArrowLinker>
      </Footer>
    </Wrapper>
  )
}

export default observer(SearchHint)
