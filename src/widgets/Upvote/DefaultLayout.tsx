/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TUser, TAvatarLayout } from '@/spec'
import { buildLog } from '@/utils/logger'

import Facepile from '@/widgets/Facepile'

import AnimatedCount from '../AnimatedCount'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, Button, Alias, UpvoteBtnWrapper, LineDivider } from './styles/default_layout'
import { AVATAR_LAYOUT } from '@/constant/layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  alias?: string
  viewerHasUpvoted?: boolean
  avatarList?: TUser[]
  onAction?: (viewerHasUpvoted: boolean) => void
  avatarLayout?: TAvatarLayout
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 4,
  alias = '赞同',
  viewerHasUpvoted = false,
  onAction = log,
  avatarList,
  avatarLayout = AVATAR_LAYOUT.SQUARE,
}) => {
  const { isMobile } = useMobileDetect()
  const noOne = count === 0

  return (
    <Wrapper testid={testid}>
      <Button>
        <UpvoteBtnWrapper>
          <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} onAction={onAction} count={count} />
        </UpvoteBtnWrapper>
        <Alias>{alias}</Alias>
        <AnimatedCount count={count} active={viewerHasUpvoted} size="medium" />
      </Button>
      {!noOne && <LineDivider />}
      {!noOne && !isMobile && <Facepile users={avatarList} avatarLayout={avatarLayout} showMore />}
    </Wrapper>
  )
}

export default memo(Upvote)
