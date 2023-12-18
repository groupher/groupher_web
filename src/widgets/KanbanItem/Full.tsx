/*
 *
 * KanbanItem
 *
 */

import { FC, memo, useState, useEffect } from 'react'

import type { TArticle } from '@/spec'

import { buildLog } from '@/logger'
import { mockTags, mockUsers } from '@/mock'
import { getRandomInt } from '@/helper'
import { UPVOTE_LAYOUT } from '@/constant/layout'

// import IconButton from '@/widgets/Buttons/IconButton'
import ArticleCatState from '@/widgets/ArticleCatState'
import Upvote from '@/widgets/Upvote'
import TagsList from '@/widgets/TagsList'

import { Wrapper, Header, Footer, UpvotesWrapper, Title, Desc } from './styles/full'

const _log = buildLog('w:KanbanItem:index')

type TProps = {
  testid?: string
  article: TArticle
  noBg: boolean
}

const KanbanItem: FC<TProps> = ({ testid = 'gtd-item', article, noBg }) => {
  const [titleIdx, setTitleIdx] = useState(0)

  useEffect(() => {
    setTitleIdx(getRandomInt(0, 7))
  }, [])

  const tags = mockTags(8)

  return (
    <Wrapper $testid={testid} $noBg={noBg}>
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
        <ArticleCatState cat={article.cat} top={1} />
      </Footer>
    </Wrapper>
  )
}

export default memo(KanbanItem)
