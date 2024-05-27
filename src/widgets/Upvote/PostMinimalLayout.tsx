/*
 *
 * Upvote
 *
 */

import { type FC, memo } from 'react'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import { UPVOTE_LAYOUT } from '@/const/layout'
import AnimatedCount from '@/widgets/AnimatedCount'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, Button, UpWrapper, CountWrapper } from './styles/post_minimal_layout'

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
