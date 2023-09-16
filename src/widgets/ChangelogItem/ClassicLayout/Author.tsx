import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TUser } from '@/spec'
import useAvatarLayout from '@/hooks/useAvatarLayout'

import { Wrapper, Avatar, Name } from '../styles/classic_layout/author'

type TProps = {
  user: TUser
}

const Author: FC<TProps> = ({ user }) => {
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper>
      <Avatar src={user.avatar} avatarLayout={avatarLayout} />
      <Name>{user.nickname}</Name>
    </Wrapper>
  )
}

export default observer(Author)
