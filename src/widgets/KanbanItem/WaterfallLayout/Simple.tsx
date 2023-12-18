/*
 *
 * KanbanItem
 *
 */

import { FC, memo } from 'react'

import type { TArticle } from '@/spec'

import ArticleCatState from '@/widgets/ArticleCatState'

import { UPVOTE_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/logger'
import { mockUsers } from '@/mock'
import { previewArticle } from '@/signal'

import { SpaceGrow } from '@/widgets/Common'
import Upvote from '@/widgets/Upvote'

import { Wrapper, Title, UpvotesWrapper } from '../styles/waterfall_layout/simple'

const _log = buildLog('w:KanbanItem:index')

type TProps = {
  testid?: string
  article: TArticle
}

const KanbanItem: FC<TProps> = ({ testid = 'gtd-item', article }) => {
  return (
    <Wrapper>
      <Title onClick={() => previewArticle(article)}>{article.title}</Title>
      <SpaceGrow />
      <ArticleCatState cat={article.cat} right={10} top={-1} />
      <UpvotesWrapper>
        <Upvote
          count={article.upvotesCount + 2}
          avatarList={mockUsers(3)}
          type={UPVOTE_LAYOUT.GENERAL}
        />
      </UpvotesWrapper>
    </Wrapper>
  )
}

export default memo(KanbanItem)
