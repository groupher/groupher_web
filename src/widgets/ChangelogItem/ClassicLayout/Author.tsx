import { FC } from 'react'

import type { TAvatarLayout, TUser } from '@/spec'

import { Wrapper, Avatar, Name } from '../styles/classic_layout/author'

type TProps = {
  avatarLayout: TAvatarLayout
  user: TUser
}

const Author: FC<TProps> = ({ avatarLayout, user }) => {
  return (
    <Wrapper>
      <Avatar src={user.avatar} avatarLayout={avatarLayout} />
      <Name>{user.nickname}</Name>
    </Wrapper>
  )
}

export default Author
