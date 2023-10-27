/*
 *
 * Upvote
 *
 */
import { FC } from 'react'

import type { TUser } from '@/spec'
import { buildLog } from '@/logger'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import Facepile from '@/widgets/Facepile'

import useUpvote from './useUpvote'
import AnimatedCount from '../AnimatedCount'
import UpvoteBtn from './UpvoteBtn'

import {
  Wrapper,
  Button,
  UpvoteBtnWrapper,
  Count,
  Digest,
  FacesWrapper,
  Note,
  Name,
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
  const primaryColor = usePrimaryColor()
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })

  const noOne = count === 0
  const names = !noOne ? avatarList.map((user) => user.nickname).slice(0, 4) : []

  return (
    <Wrapper testid={testid}>
      <Button $active={viewerHasUpvoted} color={primaryColor} onClick={handleClick}>
        <UpvoteBtnWrapper>
          <UpvoteBtn
            viewerHasUpvoted={viewerHasUpvoted}
            count={count}
            startAnimate={startAnimate}
          />
        </UpvoteBtnWrapper>
        <Count>
          <AnimatedCount count={count} $active={viewerHasUpvoted} size="large" />
        </Count>
      </Button>
      {!noOne && (
        <Digest>
          <FacesWrapper>
            <Facepile left={-4} users={avatarList} showMore={false} />
          </FacesWrapper>
          <Note>
            {names.map((name, index) => (
              <>
                <Name key={name}>{name}</Name>
                {index !== names.length - 1 ? <>，</> : <>&nbsp;</>}
              </>
            ))}
            {alias}
          </Note>
        </Digest>
      )}
    </Wrapper>
  )
}

export default Upvote
