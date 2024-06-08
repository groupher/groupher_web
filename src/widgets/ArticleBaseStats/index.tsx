/*
 *
 * ArticleBaseStats
 *
 */

import { type FC, memo } from 'react'

import type { TArticle, TContainer, TSpace } from '@/spec'
import { scrollToComments } from '@/dom'

import {
  Wrapper,
  ViewsIcon,
  CommentWrapper,
  CommentIcon,
  Count,
  CommentCount,
  Divider,
} from './styles'

type TProps = {
  testid?: string
  article: TArticle
  container?: TContainer
} & TSpace

const ArticleBaseStats: FC<TProps> = ({
  testid = 'article-base-stats',
  container = 'body',
  article,
  ...restProps
}) => {
  return (
    <Wrapper $testid={testid} {...restProps}>
      <ViewsIcon />
      <Count>{article.views}</Count>
      <Divider />
      <CommentWrapper onClick={() => scrollToComments(container)}>
        <CommentIcon />
        <CommentCount>{article.commentsCount}</CommentCount>
      </CommentWrapper>
    </Wrapper>
  )
}

export default memo(ArticleBaseStats)
