/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import { Space } from '@/widgets/Common'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, UpvoteBtnWrapper, Count } from './styles/fixed_header_layout'

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

  const noOne = count === 0

  return (
    <Wrapper testid={testid} onClick={handleClick}>
      <UpvoteBtnWrapper>
        <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} count={count} startAnimate={startAnimate} />
      </UpvoteBtnWrapper>
      <Space right={2} />
      <Count $noOne={noOne}>{count}</Count>
    </Wrapper>
  )
}

export default memo(Upvote)
