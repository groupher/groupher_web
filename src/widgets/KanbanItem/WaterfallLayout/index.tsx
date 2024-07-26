/*
 *
 * KanbanItem
 *
 */

import type { FC } from 'react'

import type { TArticle } from '~/spec'

import { UPVOTE_LAYOUT } from '~/const/layout'
import ArticleCatState from '~/widgets/ArticleCatState'
import TagsList from '~/widgets/TagsList'

import { mockUsers } from '~/mock'
import { previewArticle } from '~/signal'

import { SpaceGrow } from '~/widgets/Common'
import Upvote from '~/widgets/Upvote'

import { Wrapper, Title, UpvotesWrapper } from '../styles/waterfall_layout'

type TProps = {
  article: TArticle
}

const KanbanItem: FC<TProps> = ({ article }) => {
  const { title, articleTags, cat, upvotesCount } = article

  return (
    <Wrapper>
      <Title onClick={() => previewArticle(article)}>{title}</Title>
      <SpaceGrow />
      <TagsList items={articleTags} right={1} />
      <ArticleCatState cat={cat} right={10} top={-1} />
      <UpvotesWrapper>
        <Upvote count={upvotesCount + 2} avatarList={mockUsers(3)} type={UPVOTE_LAYOUT.GENERAL} />
      </UpvotesWrapper>
    </Wrapper>
  )
}

export default KanbanItem
