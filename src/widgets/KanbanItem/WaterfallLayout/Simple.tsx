/*
 *
 * KanbanItem
 *
 */

import { FC, memo } from 'react'

import type { TArticle } from '@/spec'

import { ARTICLE_CAT } from '@/constant/gtd'
import { UPVOTE_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/logger'
import { mockUsers } from '@/mock'
import { previewArticle } from '@/signal'

import Upvote from '@/widgets/Upvote'

import { Wrapper, Title, CatSign, LightIcon, BugIcon } from '../styles/waterfall_layout/simple'

const _log = buildLog('w:KanbanItem:index')

type TProps = {
  testid?: string
  article: TArticle
}

const KanbanItem: FC<TProps> = ({ testid = 'gtd-item', article }) => {
  return (
    <Wrapper>
      <CatSign>
        {article.cat === ARTICLE_CAT.FEATURE && <LightIcon />}
        {article.cat === ARTICLE_CAT.BUG && <BugIcon />}
      </CatSign>

      <Title onClick={() => previewArticle(article)}>{article.title}</Title>
      <Upvote count={article.upvotesCount} avatarList={mockUsers(3)} type={UPVOTE_LAYOUT.SIMPLE} />
    </Wrapper>
  )
}

export default memo(KanbanItem)
