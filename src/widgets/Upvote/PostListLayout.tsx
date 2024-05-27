/*
 *
 * Upvote
 *
 */

import { type FC, memo } from 'react'

import AnimatedCount from '@/widgets/AnimatedCount'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'
import { Wrapper, UpWrapper, CountWrapper } from './styles/post_list_layout'

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
  onAction = console.log,
}) => {
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })

  return (
    <Wrapper $testid={testid}>
      <UpWrapper onClick={handleClick}>
        <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} count={count} startAnimate={startAnimate} />
      </UpWrapper>
      <CountWrapper>
        <AnimatedCount count={count} $active={viewerHasUpvoted} />
      </CountWrapper>
    </Wrapper>
  )
}

export default memo(Upvote)
