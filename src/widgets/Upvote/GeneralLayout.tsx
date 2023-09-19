/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import type { TUser } from '@/spec'
import { buildLog } from '@/logger'

import Facepile from '@/widgets/Facepile'
import { DesktopOnly } from '@/widgets/Common'

import AnimatedCount from '../AnimatedCount'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, UpvoteBtnWrapper, LineDivider } from './styles/general_layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  viewerHasUpvoted?: boolean
  avatarList?: TUser[]
  onAction?: (viewerHasUpvoted: boolean) => void
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 4,
  viewerHasUpvoted = false,
  onAction = log,
  avatarList,
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
      <DesktopOnly>{!noOne && <Facepile users={avatarList} showMore />}</DesktopOnly>
    </Wrapper>
  )
}

export default memo(Upvote)
