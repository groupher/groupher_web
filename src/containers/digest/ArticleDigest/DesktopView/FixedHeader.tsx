import { FC, memo } from 'react'

import type { TArticle, TMetric, TThread } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import METRIC from '@/constant/metric'

import ArticleCatState from '@/widgets/ArticleCatState'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'

import {
  Wrapper,
  InnerWrapper,
  ContentWrapper,
  RightWrapper,
  Title,
  ArticleStateBadgeWrapper,
} from '../styles/desktop_view/fixed_header'

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
  const { meta } = article
  const thread = meta.thread.toLowerCase() as TThread

  return (
    <Wrapper show={show} testid={testid}>
      <InnerWrapper metric={metric}>
        <ContentWrapper metric={metric}>
          <Title>{article.title}</Title>
          <ArticleStateBadgeWrapper>
            {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} left={18} />}
            {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} left={18} />}
            {article.id === '227' && (
              <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" left={18} />
            )}
            {article.id === '228' && (
              <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" left={18} />
            )}
            {article.id === '226' && (
              <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVE" left={18} />
            )}
            {article.id === '225' && (
              <ArticleCatState
                cat={ARTICLE_CAT.FEATURE}
                state={ARTICLE_STATE.REJECT_DUP}
                left={18}
              />
            )}
          </ArticleStateBadgeWrapper>
        </ContentWrapper>
        <RightWrapper metric={metric} thread={thread}>
          <ArticleBaseStats article={article} container="drawer" />
        </RightWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(FixedHeader)
