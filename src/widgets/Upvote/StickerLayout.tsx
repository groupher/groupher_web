/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import type { TUser, TAvatarLayout } from '@/spec'
import { buildLog } from '@/utils/logger'

import { AVATAR_LAYOUT, UPVOTE_LAYOUT } from '@/constant/layout'
import AnimatedCount from '@/widgets/AnimatedCount'
import Facepile from '@/widgets/Facepile'

import UpvoteBtn from './UpvoteBtn'
import { Wrapper, Button, FacesWrapper, UpWrapper, CountWrapper } from './styles/sticker_layout'

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
  const noOne = count === 0

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
      {!noOne && (
        <FacesWrapper count={count}>
          <Facepile users={avatarList} avatarLayout={avatarLayout} showMore={false} limit={3} />
        </FacesWrapper>
      )}
    </Wrapper>
  )
}

export default memo(Upvote)
