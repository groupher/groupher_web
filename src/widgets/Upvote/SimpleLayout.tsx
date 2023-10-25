/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import AnimatedCount from '../AnimatedCount'
import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, UpvoteBtnWrapper, CountWrapper } from './styles/simple_layout'

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
  count = 4,
  viewerHasUpvoted = false,
  onAction = log,
}) => {
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })

  return (
    <Wrapper testid={testid} onClick={() => handleClick()}>
      <UpvoteBtnWrapper>
        <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} count={count} startAnimate={startAnimate} />
      </UpvoteBtnWrapper>
      <CountWrapper>
        <AnimatedCount count={count} $active={viewerHasUpvoted} size="small" />
      </CountWrapper>
    </Wrapper>
  )
}

export default memo(Upvote)
