/*
 *
 * Upvote
 *
 */
import { type FC, Fragment } from 'react'

import type { TUser } from '@/spec'

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
  Note,
  Name,
} from './styles/default_layout'

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
  onAction = console.log,
  avatarList,
}) => {
  const primaryColor = usePrimaryColor()
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })

  const noOne = count === 0
  const names = !noOne ? avatarList.map((user) => user.nickname).slice(0, 4) : []

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
        <Count>
          <AnimatedCount count={count} $active={viewerHasUpvoted} size="large" />
        </Count>
      </Button>
      {!noOne && (
        <Digest>
          <Facepile users={avatarList} showMore={false} left={-4} bottom={3} top={3} />
          <Note>
            {names.map((name, index) => (
              <Fragment key={name}>
                <Name>{name}</Name>
                {index !== names.length - 1 ? <>，</> : <>&nbsp;</>}
              </Fragment>
            ))}
            {alias}
          </Note>
        </Digest>
      )}
    </Wrapper>
  )
}

export default Upvote
