/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import type { TUser } from '@/spec'
import { buildLog } from '@/utils/logger'

import { UPVOTE_LAYOUT } from '@/constant/layout'
import AnimatedCount from '@/widgets/AnimatedCount'

import UpvoteBtn from './UpvoteBtn'
import { Wrapper, Button, UpWrapper, CountWrapper } from './styles/sticker_layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  avatarList?: TUser[]
  viewerHasUpvoted?: boolean
  onAction?: (viewerHasUpvoted: boolean) => void
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 0,
  viewerHasUpvoted = false,
  onAction = log,
  avatarList,
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
        <CountWrapper>
          <AnimatedCount count={count} active={viewerHasUpvoted} size="medium" />
        </CountWrapper>
      </Button>
    </Wrapper>
  )
}

export default memo(Upvote)
