import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TUser } from '@/spec'
import useAvatarLayout from '@/hooks/useAvatarLayout'
import ImgFallback from '@/widgets/ImgFallback'

import { Wrapper, Avatar } from '../../styles/panel/user_list'

type TProps = {
  users: TUser[]
}

const UserList: FC<TProps> = ({ users }) => {
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper>
      {users.map((user) => (
        <Avatar
          key={user.id}
          src={user.avatar}
          $avatarLayout={avatarLayout}
          fallback={<ImgFallback size={20} user={user} />}
        />
      ))}
    </Wrapper>
  )
}

export default observer(UserList)
