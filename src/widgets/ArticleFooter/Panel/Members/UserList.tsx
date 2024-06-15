import type { FC } from 'react'

import type { TUser } from '@/spec'
import useLayout from '@/hooks/useLayout'
import ImgFallback from '@/widgets/ImgFallback'

import { Wrapper, Avatar } from '../../styles/panel/user_list'

type TProps = {
  users: TUser[]
}

const UserList: FC<TProps> = ({ users }) => {
  const { avatarLayout } = useLayout()

  return (
    <Wrapper>
      {users.map((user) => (
        <Avatar
          key={user.login}
          src={user.avatar}
          $avatarLayout={avatarLayout}
          fallback={<ImgFallback size={20} user={user} />}
        />
      ))}
    </Wrapper>
  )
}

export default UserList
