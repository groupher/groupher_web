/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import type { TUser, TAvatarLayout } from '@/spec'
import { buildLog } from '@/logger'

import { AVATAR_LAYOUT, UPVOTE_LAYOUT } from '@/constant/layout'
import AnimatedCount from '@/widgets/AnimatedCount'

import UpvoteBtn from './UpvoteBtn'
import { Wrapper, Button, UpWrapper, CountWrapper, Alias } from './styles/article_layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  viewerHasUpvoted?: boolean
  onAction?: (viewerHasUpvoted: boolean) => void
  avatarLayout?: TAvatarLayout
  avatarList: TUser[]
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 0,
  viewerHasUpvoted = false,
  onAction = log,
  avatarList = [],
  avatarLayout = AVATAR_LAYOUT.SQUARE,
}) => {
  return (
    <Wrapper testid={testid}>
      <Button>
        <UpWrapper>
          <UpvoteBtn
            type={UPVOTE_LAYOUT.COMMENT}
            viewerHasUpvoted={viewerHasUpvoted}
            onAction={onAction}
            count={count}
          />
        </UpWrapper>
        <CountWrapper>
          <AnimatedCount count={count} active={viewerHasUpvoted} size="medium" />
        </CountWrapper>
      </Button>
      <Alias>投票</Alias>
    </Wrapper>
  )
}

export default memo(Upvote)
