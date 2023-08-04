import { FC, memo } from 'react'

import { includes } from 'ramda'
import Markdown from 'markdown-to-jsx'

import type { TFAQSection } from '@/spec'
import { Wrapper, Header, Title, ArrowIcon, Body } from '../styles/collapse/section'

type TProps = {
  item: TFAQSection
  openedIDs: number[]
  toggle: (id: number) => void
}

const Section: FC<TProps> = ({ item, openedIDs, toggle }) => {
  const isOpened = includes(item.index, openedIDs)

  return (
    <Wrapper>
      <Header onClick={() => toggle(item.index)}>
        <Title $active={isOpened}>{item.title}</Title>
        <ArrowIcon $active={isOpened} />
      </Header>

      <Body show={isOpened}>
        <Markdown>{item.body}</Markdown>
      </Body>
    </Wrapper>
  )
}

export default memo(Section)
