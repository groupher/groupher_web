import { type FC, memo } from 'react'
import TimeAgo from 'timeago-react'

import { UPVOTE_LAYOUT } from '~/const/layout'
import SIZE from '~/const/size'

import type { TArticle } from '~/spec'
import { upvoteArticle } from '~/signal'
import Upvote from '~/widgets/Upvote'
import DotDivider from '~/widgets/DotDivider'
import CommentsCount from '~/widgets/CommentsCount'

import { Wrapper, PublishWrapper, Bottom } from './styles/footer'

type TProps = {
  data: TArticle
}

const Footer: FC<TProps> = ({ data }) => {
  const { author, insertedAt, commentsCount, upvotesCount, viewerHasUpvoted, meta } = data

  return (
    <Wrapper>
      <PublishWrapper>
        {author.nickname} <DotDivider space={6} />
        <TimeAgo datetime={insertedAt} locale="zh_CN" />
      </PublishWrapper>
      <Bottom>
        <Upvote
          type={UPVOTE_LAYOUT.GENERAL}
          count={upvotesCount}
          avatarList={meta.latestUpvotedUsers}
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => upvoteArticle(data, viewerHasUpvoted)}
        />

        {commentsCount !== 0 && <CommentsCount count={commentsCount} size={SIZE.MEDIUM} />}
      </Bottom>
    </Wrapper>
  )
}

export default memo(Footer)
