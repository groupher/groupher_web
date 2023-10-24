/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import { UPVOTE_LAYOUT } from '@/constant/layout'
import AnimatedCount from '@/widgets/AnimatedCount'

import UpvoteBtn from './UpvoteBtn'
import { Wrapper, Button, CountWrapper, Alias } from './styles/article_layout'

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
      <Button>
        <UpvoteBtn
          type={UPVOTE_LAYOUT.COMMENT}
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={onAction}
          count={count}
        />
        <CountWrapper>
          <AnimatedCount count={count} active={viewerHasUpvoted} size="medium" />
        </CountWrapper>
        <Alias>票</Alias>
      </Button>
    </Wrapper>
  )
}

export default memo(Upvote)
