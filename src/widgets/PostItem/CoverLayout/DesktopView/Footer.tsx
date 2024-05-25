import { memo, FC } from 'react'
import TimeAgo from 'timeago-react'

import type { TPost } from '@/spec'
import { UPVOTE_LAYOUT } from '@/const/layout'

import { SpaceGrow } from '@/widgets/Common'
import Upvote from '@/widgets/Upvote'

import { Wrapper, CreateTime } from '../../styles/cover_layout/desktop_view/footer'

type TProps = {
  article: TPost
}

const Footer: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted, insertedAt } = article

  return (
    <Wrapper>
      <Upvote
        count={upvotesCount}
        avatarList={meta.latestUpvotedUsers}
        viewerHasUpvoted={viewerHasUpvoted}
        type={UPVOTE_LAYOUT.GENERAL}
        left={-2}
        top={-1}
      />
      <SpaceGrow />
      <CreateTime>
        <TimeAgo datetime={insertedAt} locale="zh_CN" />
      </CreateTime>
    </Wrapper>
  )
}

export default memo(Footer)
