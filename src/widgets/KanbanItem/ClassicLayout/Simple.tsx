/*
 *
 * KanbanItem
 *
 */

import { type FC, memo, useState, useEffect } from 'react'

import type { TArticle } from '~/spec'

import { UPVOTE_LAYOUT } from '~/const/layout'

import { mockTags, mockUsers } from '~/mock'
import { previewArticle } from '~/signal'
import { getRandomInt } from '~/helper'

import CommentsCount from '~/widgets/CommentsCount'
import { Row, Space } from '~/widgets/Common'

// import IconButton from '~/widgets/Buttons/IconButton'
import ArticleCatState from '~/widgets/ArticleCatState'
import Upvote from '~/widgets/Upvote'
import TagsList from '~/widgets/TagsList'

import { Wrapper, Header, Footer, Title } from '../styles/classic_layout/simple'

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
    <Wrapper $testid={testid}>
      <Header>
        <TagsList items={[tags[titleIdx]]} left={1} />
        {/* <IconButton path="shape/more.svg" /> */}
      </Header>
      <Title onClick={() => previewArticle(article)}>{article.title}</Title>
      <Footer>
        <Row>
          <Upvote
            count={article.upvotesCount}
            avatarList={mockUsers(3)}
            type={UPVOTE_LAYOUT.SIMPLE}
          />
          <Space right={15} />
          {article.commentsCount !== 0 && (
            <CommentsCount count={article.commentsCount} size="medium" />
          )}
        </Row>
        <ArticleCatState cat={article.cat} />
      </Footer>
    </Wrapper>
  )
}

export default memo(KanbanItem)
