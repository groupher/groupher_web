/*
 *
 * Upvote
 *
 */

import { type FC, memo } from 'react'

import type { TUser } from '@/spec'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import Facepile from '@/widgets/Facepile'
import { DesktopOnly, LineDivider } from '@/widgets/Common'

import useUpvote from './useUpvote'
import AnimatedCount from '../AnimatedCount'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, Button, UpvoteBtnWrapper } from './styles/general_layout'

type TProps = {
  testid?: string
  count?: number
  viewerHasUpvoted?: boolean
  avatarList?: TUser[]
  onAction?: (viewerHasUpvoted: boolean) => void
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 4,
  viewerHasUpvoted = false,
  onAction = console.log,
  avatarList,
}) => {
  const primaryColor = usePrimaryColor()
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })
  const noOne = count === 0

  return (
    <Wrapper $testid={testid}>
      <Button $active={viewerHasUpvoted} color={primaryColor} onClick={handleClick}>
        <UpvoteBtnWrapper>
          <UpvoteBtn
            viewerHasUpvoted={viewerHasUpvoted}
            count={count}
            startAnimate={startAnimate}
          />
        </UpvoteBtnWrapper>
        <AnimatedCount
          left={4}
          count={count}
          $active={viewerHasUpvoted}
          size={count === 0 ? 'small' : 'medium'}
        />
      </Button>
      <DesktopOnly>
        {!noOne && <LineDivider left={!viewerHasUpvoted && count > 0 ? 4 : 12} right={10} />}
      </DesktopOnly>
      <DesktopOnly>{!noOne && <Facepile users={avatarList} showMore />}</DesktopOnly>
    </Wrapper>
  )
}

export default memo(Upvote)
