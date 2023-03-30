import { FC, memo } from 'react'

import type { TArticle, TMetric } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import METRIC from '@/constant/metric'

import { SpaceGrow } from '@/widgets/Common'
import Upvote from '@/widgets/Upvote'
import ArticleCatState from '@/widgets/ArticleCatState'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'

import { Wrapper, InnerWrapper, ContentWrapper, Title } from '../styles/desktop_view/fixed_header'

type TProps = {
  article: TArticle
  metric?: TMetric
  show?: boolean
  testid?: string
}
const FixedHeader: FC<TProps> = ({
  article,
  show = false,
  metric = METRIC.ARTICLE,
  testid = 'article-fixed-header',
}) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <Wrapper show={show} testid={testid}>
      <InnerWrapper metric={metric}>
        <ContentWrapper metric={metric}>
          {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} right={8} />}
          {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} right={8} />}
          {article.id === '227' && <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" right={8} />}
          {article.id === '228' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" right={8} />
          )}
          {article.id === '226' && (
            <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVED" right={8} />
          )}
          {article.id === '225' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state={ARTICLE_STATE.REJECT_DUP} right={8} />
          )}
          <Title>{article.title}</Title>
          <SpaceGrow />
          <Upvote
            count={upvotesCount}
            avatarList={meta.latestUpvotedUsers}
            viewerHasUpvoted={viewerHasUpvoted}
            type="fixed_header"
            right={16}
          />
          <ArticleBaseStats article={article} container="drawer" />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(FixedHeader)
