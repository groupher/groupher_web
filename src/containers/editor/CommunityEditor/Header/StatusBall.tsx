import type { FC } from 'react'

import type { TCommunityType } from '../spec'
import { COMMUNITY_CATS_TEXT_COLORS } from '../constant'

import {
  DoingWrapper,
  DoneWrapper,
  TodoWrapper,
  Dot,
  CheckIcon,
} from '../styles/header/status_ball'

type TProps = {
  done?: boolean
  doing?: boolean
  communityType: TCommunityType
}

const StatusBall: FC<TProps> = ({ done = false, doing = false, communityType }) => {
  const colors = COMMUNITY_CATS_TEXT_COLORS[communityType]

  if (done) {
    return (
      <DoneWrapper $colors={colors} $noBorder>
        <CheckIcon />
      </DoneWrapper>
    )
  }

  if (doing) {
    return (
      <DoingWrapper $colors={colors}>
        <Dot $colors={colors} />
      </DoingWrapper>
    )
  }

  return <TodoWrapper $colors={colors} />
}

export default StatusBall
