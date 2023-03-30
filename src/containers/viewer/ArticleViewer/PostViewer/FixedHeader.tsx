import { FC, memo } from 'react'

import type { TArticle } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import { UPVOTE_LAYOUT } from '@/constant/layout'

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
            type={UPVOTE_LAYOUT.FIXED_HEADER}
          />
        </UpvoteWrapper>

        <ArticleStateBadgeWrapper>
          {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} />}
          {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} />}
          {article.id === '227' && <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" />}
          {article.id === '228' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" />}
          {article.id === '226' && <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVED" />}
          {article.id === '225' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state={ARTICLE_STATE.REJECT_DUP} />
          )}
        </ArticleStateBadgeWrapper>
        <ArticleTitle>{article.title}</ArticleTitle>
      </LeftPart>
      <ArticleBaseStats article={article} container="drawer" />
    </Wrapper>
  )
}

export default memo(FixedHeader)
