/*
 * PostLayout
 */

import { FC, memo } from 'react'

import type { TPost, TMetric } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import METRIC from '@/constant/metric'
import { buildLog } from '@/logger'

// import ArchivedSign from '@/widgets/ArchivedSign'
import Upvote from '@/widgets/Upvote'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'
// import ArticleBelongCommunity from '@/widgets/ArticleBelongCommunity'
// import ArticleMenu from '@/widgets/ArticleMenu'
import ReadableDate from '@/widgets/ReadableDate'
import ArticleCatState from '@/widgets/ArticleCatState'

// import BackTo from './BackTo'

import {
  Wrapper,
  Topping,
  PublishDateInfo,
  Title,
  BottomInfo,
  Divider,
} from '../styles/mobile_view/post_layout'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleDigest')

type TProps = {
  article: TPost
  metric?: TMetric
}

const PostLayout: FC<TProps> = ({ metric = METRIC.ARTICLE, article }) => {
  const {
    title,
    insertedAt,
    // isArchived,
    // archivedAt,
    upvotesCount,
    meta,
    viewerHasUpvoted,
  } = article

  return (
    <Wrapper metric={metric}>
      {/* <BackTo /> */}
      <Topping>
        <div>
          {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} />}
          {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} />}
          {article.id === '227' && <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" />}
          {article.id === '228' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" />}
          {article.id === '226' && <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVED" />}
          {article.id === '225' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state={ARTICLE_STATE.REJECT_DUP} />
          )}
        </div>
        <Divider />
        <PublishDateInfo>
          <ReadableDate date={insertedAt} withTime={false} />
        </PublishDateInfo>
      </Topping>
      <Title>{title}</Title>
      <BottomInfo>
        <Upvote
          count={upvotesCount}
          avatarList={meta.latestUpvotedUsers}
          viewerHasUpvoted={viewerHasUpvoted}
        />
        <ArticleBaseStats article={article} />
        {/* <ArticleMenu article={article} /> */}
      </BottomInfo>
    </Wrapper>
  )
}

export default memo(PostLayout)
