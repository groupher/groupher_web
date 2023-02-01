import { FC } from 'react'

import type { TUser, TAvatarLayout } from '@/spec'

import { Wrapper, Avatar } from '../../styles/panel/user_list'

type TProps = {
  avatarLayout: TAvatarLayout
  users: TUser[]
}

const UserList: FC<TProps> = ({ avatarLayout, users }) => {
  return (
    <Wrapper>
      {users.map((user) => (
        <Avatar key={user.id} src={user.avatar} avatarLayout={avatarLayout} />
      ))}
    </Wrapper>
  )
}

export default UserList
