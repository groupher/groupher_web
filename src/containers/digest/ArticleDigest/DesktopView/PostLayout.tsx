/*
 * PostLayout
 */

import { FC, memo } from 'react'
import Router from 'next/router'

import type { TPost, TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import { buildLog } from '@/utils/logger'

// import ArchivedSign from '@/widgets/ArchivedSign'
import Upvote from '@/widgets/Upvote'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

// import ArticleBelongCommunity from '@/widgets/ArticleBelongCommunity'
// import ArticleMenu from '@/widgets/ArticleMenu'
// import BackTo from './BackTo'

import {
  Wrapper,
  LeftPart,
  RightPart,
  Topping,
  Title,
  SubTitle,
  Avatar,
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
  const { id, author, title, upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <Wrapper metric={metric}>
      <LeftPart>
        <Topping>
          <ArrowButton leftLayout size="small" left="-5" onClick={() => Router.push('/home')}>
            讨论区
          </ArrowButton>
        </Topping>
        <Title>
          {title}
          <SubTitle>{id}</SubTitle>
        </Title>
        <BottomInfo>
          <AuthorName href="/">
            <Avatar src={author.avatar} />
            {author.nickname}
          </AuthorName>
          <ArticleBaseStats article={article} />
          {/* <ArticleMenu article={article} /> */}
        </BottomInfo>
      </LeftPart>

      <RightPart>
        <Upvote
          count={upvotesCount}
          avatarList={meta.latestUpvotedUsers}
          viewerHasUpvoted={viewerHasUpvoted}
          type="article"
        />
      </RightPart>
    </Wrapper>
  )
}

export default memo(PostLayout)
