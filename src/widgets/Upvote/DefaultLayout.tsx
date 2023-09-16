/*
 *
 * Upvote
 *
 */
import { FC } from 'react'

import type { TUser } from '@/spec'
import { buildLog } from '@/utils/logger'

import Facepile from '@/widgets/Facepile'

import AnimatedCount from '../AnimatedCount'
import UpvoteBtn from './UpvoteBtn'

import {
  Wrapper,
  Button,
  Alias,
  UpvoteBtnWrapper,
  Count,
  Digest,
  FacesWrapper,
  Note,
} from './styles/default_layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  alias?: string
  viewerHasUpvoted?: boolean
  avatarList?: TUser[]
  onAction?: (viewerHasUpvoted: boolean) => void
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 4,
  alias = '参与了投票',
  viewerHasUpvoted = false,
  onAction = log,
  avatarList,
}) => {
  const noOne = count === 0

  return (
    <Wrapper testid={testid}>
      <Button>
        <UpvoteBtnWrapper>
          <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} onAction={onAction} count={count} />
        </UpvoteBtnWrapper>
        <Count>
          <AnimatedCount count={count} active={viewerHasUpvoted} size="medium" />
        </Count>
      </Button>
      {!noOne && (
        <Digest>
          <FacesWrapper>
            <Facepile left={-4} users={avatarList} showMore={false} />
          </FacesWrapper>
          <Note>xx, xx {alias}</Note>
        </Digest>
      )}
    </Wrapper>
  )
}

export default Upvote
