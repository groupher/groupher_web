import { FC } from 'react'

import type { TAvatarLayout } from '@/spec'
import { mockUsers } from '@/utils/mock'

import { Wrapper, Avatar, Name } from '../styles/classic_layout/author'

type TProps = {
  avatarLayout: TAvatarLayout
}

const Author: FC<TProps> = ({ avatarLayout }) => {
  const user = mockUsers(1)[0]

  return (
    <Wrapper>
      <Avatar src={user.avatar} avatarLayout={avatarLayout} />
      <Name>{user.nickname}</Name>
    </Wrapper>
  )
}

export default Author
