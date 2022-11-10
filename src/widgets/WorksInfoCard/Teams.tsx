import { FC, memo } from 'react'

import type { TUser } from '@/spec'
import { Wrapper, Member, Avatar, Intro, Name, Bio } from './styles/teams'

type TProps = {
  teammates: TUser[]
}

const Teams: FC<TProps> = ({ teammates }) => {
  return (
    <Wrapper>
      {teammates.map((user) => (
        <Member key={user.login}>
          <Avatar src={user.avatar} />
          <Intro>
            <Name href={`/u/${user.login}`}>{user.nickname}</Name>
            <Bio>{user.bio}</Bio>
          </Intro>
        </Member>
      ))}
    </Wrapper>
  )
}

export default memo(Teams)
