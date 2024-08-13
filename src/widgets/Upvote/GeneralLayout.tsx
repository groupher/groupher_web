/*
 *
 * Upvote
 *
 */

import { type FC, memo } from 'react'

import type { TUser } from '~/spec'

import Facepile from '~/widgets/Facepile'
import { LineDivider } from '~/widgets/Common'

import AnimatedCount from '../AnimatedCount'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'

import useSalon, { cn } from './salon/general_layout'

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
  const s = useSalon({ viewerHasUpvoted })

  const { handleClick } = useUpvote({ viewerHasUpvoted, onAction })
  const noOne = count === 0

  return (
    <div className={s.wrapper}>
      <button className={cn(s.button)} onClick={handleClick}>
        <div className={s.upvote}>
          <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} count={count} />
        </div>
        <AnimatedCount
          left={1}
          count={count}
          active={viewerHasUpvoted}
          size={count === 0 ? 'small' : 'medium'}
        />
      </button>
      {!noOne && <LineDivider left={!viewerHasUpvoted && count > 0 ? 4 : 12} right={10} />}
      {!noOne && <Facepile users={avatarList} showMore />}
    </div>
  )
}

export default memo(Upvote)
