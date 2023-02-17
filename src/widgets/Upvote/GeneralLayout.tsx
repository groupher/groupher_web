/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import type { TUser, TAvatarLayout } from '@/spec'
import { buildLog } from '@/utils/logger'

import Facepile from '@/widgets/Facepile'
import { DesktopOnly } from '@/widgets/Common'

import AnimatedCount from '../AnimatedCount'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, UpvoteBtnWrapper, LineDivider } from './styles/general_layout'
import { AVATAR_LAYOUT } from '@/constant/layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  viewerHasUpvoted?: boolean
  avatarList?: TUser[]
  onAction?: (viewerHasUpvoted: boolean) => void
  avatarLayout?: TAvatarLayout
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 4,
  viewerHasUpvoted = false,
  onAction = log,
  avatarList,
  avatarLayout = AVATAR_LAYOUT.SQUARE,
}) => {
  const noOne = count === 0

  return (
    <Wrapper testid={testid}>
      <UpvoteBtnWrapper>
        <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} onAction={onAction} count={count} />
      </UpvoteBtnWrapper>
      <AnimatedCount
        count={count}
        active={viewerHasUpvoted}
        size={count === 0 ? 'small' : 'medium'}
      />
      <DesktopOnly>{!noOne && <LineDivider />}</DesktopOnly>
      <DesktopOnly>
        {!noOne && <Facepile users={avatarList} avatarLayout={avatarLayout} showMore />}
      </DesktopOnly>
    </Wrapper>
  )
}

export default memo(Upvote)
