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

import { Wrapper, Button, Alias, UpWrapper, CountWrapper } from './styles/comment_layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  alias?: string
  viewerHasUpvoted?: boolean
  onAction?: (viewerHasUpvoted: boolean) => void
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  alias = '赞同',
  count = 0,
  viewerHasUpvoted = false,
  onAction = log,
}) => {
  return (
    <Wrapper testid={testid}>
      <Button>
        <UpWrapper>
          <UpvoteBtn
            type={UPVOTE_LAYOUT.COMMENT}
            viewerHasUpvoted={viewerHasUpvoted}
            onAction={onAction}
            count={count}
          />
        </UpWrapper>
        <Alias>{alias}</Alias>
        <CountWrapper>
          <AnimatedCount count={count} active={viewerHasUpvoted} size="small" />
        </CountWrapper>
      </Button>
    </Wrapper>
  )
}

export default memo(Upvote)
