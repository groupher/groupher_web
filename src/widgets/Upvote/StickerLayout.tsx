/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import type { TUser } from '@/spec'
import { buildLog } from '@/logger'

import { UPVOTE_LAYOUT } from '@/const/layout'
import AnimatedCount from '@/widgets/AnimatedCount'
import Facepile from '@/widgets/Facepile'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'
import { Wrapper, Button, FacesWrapper, UpWrapper, CountWrapper } from './styles/sticker_layout'

const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  viewerHasUpvoted?: boolean
  onAction?: (viewerHasUpvoted: boolean) => void
  avatarList: TUser[]
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 0,
  viewerHasUpvoted = false,
  onAction = log,
  avatarList = [],
}) => {
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })
  const noOne = count === 0

  return (
    <Wrapper $testid={testid}>
      <Button onClick={handleClick}>
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
      {!noOne && (
        <FacesWrapper count={count}>
          <Facepile users={avatarList} showMore={false} limit={3} />
        </FacesWrapper>
      )}
    </Wrapper>
  )
}

export default memo(Upvote)
