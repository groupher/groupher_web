/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import { UPVOTE_LAYOUT } from '@/constant/layout'
import AnimatedCount from '@/widgets/AnimatedCount'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, Button, UpWrapper, CountWrapper } from './styles/post_minimal_layout'

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
  const primaryColor = usePrimaryColor()
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })

  return (
    <Wrapper $testid={testid} onClick={() => handleClick()}>
      <Button $active={viewerHasUpvoted} color={primaryColor}>
        <UpWrapper>
          <UpvoteBtn
            type={UPVOTE_LAYOUT.COMMENT}
            viewerHasUpvoted={viewerHasUpvoted}
            startAnimate={startAnimate}
            count={count}
          />
        </UpWrapper>
        <CountWrapper>
          <AnimatedCount count={count} $active={viewerHasUpvoted} size="medium" />
        </CountWrapper>
      </Button>
    </Wrapper>
  )
}

export default memo(Upvote)
