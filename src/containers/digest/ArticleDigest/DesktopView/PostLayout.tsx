/*
 * PostLayout
 */

import { FC, Fragment, memo } from 'react'

import type { TPost, TMetric } from '@/spec'
import { METRIC, ARTICLE_CAT } from '@/constant'
import { buildLog } from '@/utils/logger'

// import ArchivedSign from '@/widgets/ArchivedSign'
import Upvote from '@/widgets/Upvote'
import { Space } from '@/widgets/Common'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'
// import ArticleBelongCommunity from '@/widgets/ArticleBelongCommunity'
import DotDivider from '@/widgets/DotDivider'
// import ArticleMenu from '@/widgets/ArticleMenu'
import ReadableDate from '@/widgets/ReadableDate'
import ArticleCatState from '@/widgets/ArticleCatState'

import {
  Main,
  Header,
  PublishDateInfo,
  Title,
  AuthorName,
  BottomInfo,
} from '../styles/desktop_view/post_layout'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleDigest')

type TProps = {
  article: TPost
  metric?: TMetric
}

const PostLayout: FC<TProps> = ({ metric = METRIC.ARTICLE, article }) => {
  const {
    author,
    title,
    insertedAt,
    // isArchived,
    // archivedAt,
    upvotesCount,
    meta,
    viewerHasUpvoted,
  } = article

  return (
    <Fragment>
      <Main metric={metric}>
        <Header>
          <AuthorName href={`/u/${author.login}`} prefetch={false}>
            {author.nickname}
          </AuthorName>
          <DotDivider space={12} />
          <PublishDateInfo>
            <ReadableDate date={insertedAt} fmt="absolute" withTime={false} />
          </PublishDateInfo>
          {/* {isArchived && (
            <Fragment>
              <DotDivider space={8} />
              <ArchivedSign date={archivedAt} />
            </Fragment>
          )} */}
          <DotDivider space={12} />
          <div>
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
              <ArticleCatState
                cat={ARTICLE_CAT.FEATURE}
                state="WIP"
                left={18}
              />
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
          </div>
        </Header>
        <Title>{title}</Title>
        <BottomInfo>
          <Upvote
            count={upvotesCount}
            avatarList={meta.latestUpvotedUsers}
            viewerHasUpvoted={viewerHasUpvoted}
          />
          <Space right={30} />
          <ArticleBaseStats article={article} />
          {/* <ArticleMenu article={article} /> */}
        </BottomInfo>
      </Main>
      {/* <CommunityInfo>
        <ArticleBelongCommunity
          article={article}
          onFollow={() => subscribeCommunity()}
          onUndoFollow={() => unsubscribeCommunity()}
        />
      </CommunityInfo> */}
    </Fragment>
  )
}

export default memo(PostLayout)
