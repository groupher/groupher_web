/*
 *
 * Upvote
 *
 */

import { type FC, memo } from 'react'

import { Space } from '@/widgets/Common'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, UpvoteBtnWrapper, Count } from './styles/fixed_header_layout'

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

  const noOne = count === 0

  return (
    <Wrapper $testid={testid} onClick={handleClick}>
      <UpvoteBtnWrapper>
        <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} count={count} startAnimate={startAnimate} />
      </UpvoteBtnWrapper>
      <Space right={2} />
      <Count $noOne={noOne}>{count}</Count>
    </Wrapper>
  )
}

export default memo(Upvote)
