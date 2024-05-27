/*
 *
 * Upvote
 *
 */

import { type FC, memo } from 'react'

import AnimatedCount from '../AnimatedCount'
import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, UpvoteBtnWrapper } from './styles/simple_layout'

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
  onAction = console.log,
}) => {
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })

  return (
    <Wrapper $testid={testid} onClick={() => handleClick()}>
      <UpvoteBtnWrapper>
        <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} count={count} startAnimate={startAnimate} />
      </UpvoteBtnWrapper>
      <AnimatedCount count={count} $active={viewerHasUpvoted} size="small" />
    </Wrapper>
  )
}

export default memo(Upvote)
