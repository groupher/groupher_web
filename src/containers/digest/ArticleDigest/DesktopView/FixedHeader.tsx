import { FC, memo } from 'react'

import type { TArticle, TMetric } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import METRIC from '@/constant/metric'

import { SpaceGrow } from '@/widgets/Common'
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
  return (
    <Wrapper show={show} testid={testid}>
      <InnerWrapper metric={metric}>
        <ContentWrapper metric={metric}>
          <Title>{article.title}</Title>
          {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} left={8} />}
          {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} left={8} />}
          {article.id === '227' && <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" left={8} />}
          {article.id === '228' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" left={8} />
          )}
          {article.id === '226' && (
            <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVE" left={8} />
          )}
          {article.id === '225' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state={ARTICLE_STATE.REJECT_DUP} left={8} />
          )}
          <SpaceGrow />
          <ArticleBaseStats article={article} container="drawer" />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(FixedHeader)
