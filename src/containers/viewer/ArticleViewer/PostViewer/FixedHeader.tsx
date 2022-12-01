import { FC, memo } from 'react'

import type { TArticle } from '@/spec'
import { ARTICLE_CAT } from '@/constant'

import Upvote from '@/widgets/Upvote'
import ArticleCatState from '@/widgets/ArticleCatState'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'

import {
  Wrapper,
  LeftPart,
  UpvoteWrapper,
  ArticleTitle,
  ArticleStateBadgeWrapper,
} from '../styles/post_viewer/fixed_header'

type TProps = {
  article: TArticle
  visible?: boolean
  footerVisible: boolean
}

const FixedHeader: FC<TProps> = ({ article, visible, footerVisible }) => {
  const { upvotesCount, viewerHasUpvoted } = article

  return (
    <Wrapper visible={visible}>
      <LeftPart>
        <UpvoteWrapper show={!footerVisible}>
          <Upvote
            count={upvotesCount}
            viewerHasUpvoted={viewerHasUpvoted}
            type="fixed-header"
          />
        </UpvoteWrapper>

        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleStateBadgeWrapper>
          {article.id === '239' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} left={18} />
          )}
          {article.id === '231' && (
            <ArticleCatState cat={ARTICLE_CAT.BUG} left={18} />
          )}
          {article.id === '227' && (
            <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" left={18} />
          )}
          {article.id === '228' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" left={18} />
          )}
          {article.id === '226' && (
            <ArticleCatState
              cat={ARTICLE_CAT.QUESTION}
              state="RESOLVE"
              left={18}
            />
          )}
          {article.id === '225' && (
            <ArticleCatState
              cat={ARTICLE_CAT.REJECT_NO_PLAN}
              state="REJECT"
              left={18}
            />
          )}
        </ArticleStateBadgeWrapper>
      </LeftPart>
      <ArticleBaseStats article={article} container="drawer" />
    </Wrapper>
  )
}

export default memo(FixedHeader)
