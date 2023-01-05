/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'

import { UPVOTE_LAYOUT } from '@/constant/layout'
import AnimatedCount from '@/widgets/AnimatedCount'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, UpWrapper, CountWrapper } from './styles/comment_layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  viewerHasUpvoted?: boolean
  onAction?: (viewerHasUpvoted: boolean) => void
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 0,
  viewerHasUpvoted = false,
  onAction = log,
}) => {
  return (
    <Wrapper testid={testid}>
      <UpWrapper>
        <UpvoteBtn
          type={UPVOTE_LAYOUT.COMMENT}
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={onAction}
          count={count}
        />
      </UpWrapper>
      <CountWrapper>
        <AnimatedCount count={count} active={viewerHasUpvoted} size="small" />
      </CountWrapper>
    </Wrapper>
  )
}

export default memo(Upvote)
