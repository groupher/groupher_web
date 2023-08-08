import { FC } from 'react'

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
}

const StatusBall: FC<TProps> = ({ done = false, doing = false }) => {
  if (done) {
    return (
      <DoneWrapper>
        <CheckIcon />
      </DoneWrapper>
    )
  }

  if (doing) {
    return (
      <DoingWrapper>
        <Dot />
      </DoingWrapper>
    )
  }

  return <TodoWrapper />
}

export default StatusBall
