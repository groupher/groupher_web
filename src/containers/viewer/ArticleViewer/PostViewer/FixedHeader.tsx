import { FC, memo } from 'react'

import type { TArticle } from '@/spec'

import { UPVOTE_LAYOUT } from '@/constant/layout'

import Upvote from '@/widgets/Upvote'
import ArticleCatState from '@/widgets/ArticleCatState'
// import ArticleBaseStats from '@/widgets/ArticleBaseStats'

import { Wrapper, LeftPart, ArticleTitle } from '../styles/post_viewer/fixed_header'

type TProps = {
  article: TArticle
  visible?: boolean
  footerVisible: boolean
}

const FixedHeader: FC<TProps> = ({ article, visible, footerVisible }) => {
  const { upvotesCount, viewerHasUpvoted, cat, state } = article

  return (
    <Wrapper visible={visible}>
      <LeftPart>
        <Upvote
          count={upvotesCount}
          viewerHasUpvoted={viewerHasUpvoted}
          type={UPVOTE_LAYOUT.FIXED_HEADER}
          right={25}
        />
        <ArticleTitle>{article.title}</ArticleTitle>
      </LeftPart>
      <ArticleCatState cat={cat} state={state} />
    </Wrapper>
  )
}

export default memo(FixedHeader)
