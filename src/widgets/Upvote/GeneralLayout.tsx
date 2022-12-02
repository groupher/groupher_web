/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TUser } from '@/spec'
import { buildLog } from '@/utils/logger'

import Facepile from '@/widgets/Facepile'

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
  const { isMobile } = useMobileDetect()
  const noOne = count === 0

  return (
    <Wrapper testid={testid}>
      <UpvoteBtnWrapper>
        <UpvoteBtn
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={onAction}
          count={count}
        />
      </UpvoteBtnWrapper>
      <AnimatedCount count={count} active={viewerHasUpvoted} />
      {!noOne && <LineDivider />}
      {!noOne && !isMobile && <Facepile users={avatarList} showMore />}
    </Wrapper>
  )
}

export default memo(Upvote)
