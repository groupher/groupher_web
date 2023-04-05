/*
 *
 * KanbanItem
 *
 */

import { FC, memo, useState, useEffect } from 'react'

import type { TArticle } from '@/spec'

import { buildLog } from '@/utils/logger'
import { mockTags, mockUsers } from '@/utils/mock'
import { getRandomInt } from '@/utils/helper'
import { UPVOTE_LAYOUT } from '@/constant/layout'

// import IconButton from '@/widgets/Buttons/IconButton'
import ArticleCatState from '@/widgets/ArticleCatState'
import Upvote from '@/widgets/Upvote'
import TagsList from '@/widgets/TagsList'

import { Wrapper, Header, Footer, UpvotesWrapper, Title, Desc } from './styles/full'

/* eslint-disable-next-line */
const log = buildLog('w:KanbanItem:index')

type TProps = {
  testid?: string
  article: TArticle
}

const KanbanItem: FC<TProps> = ({ testid = 'gtd-item', article }) => {
  const [titleIdx, setTitleIdx] = useState(0)

  useEffect(() => {
    setTitleIdx(getRandomInt(0, 7))
  }, [])

  const tags = mockTags(8)

  return (
    <Wrapper testid={testid}>
      <Header>
        <TagsList items={[tags[titleIdx]]} left={2} />
        {/* <IconButton path="shape/more.svg" /> */}
      </Header>
      <Title>{article.title}</Title>
      <Desc>{article.digest}</Desc>
      <Footer>
        <UpvotesWrapper>
          <Upvote
            count={article.upvotesCount}
            avatarList={mockUsers(3)}
            type={UPVOTE_LAYOUT.GENERAL}
          />
        </UpvotesWrapper>
        <ArticleCatState cat={article.cat} noBg top={1} />
      </Footer>
    </Wrapper>
  )
}

export default memo(KanbanItem)
