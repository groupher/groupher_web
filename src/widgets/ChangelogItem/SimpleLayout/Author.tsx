import { FC } from 'react'
import { observer } from 'mobx-react'

import useAvatarLayout from '@/hooks/useAvatarLayout'
import { mockUsers } from '@/utils/mock'

import { Wrapper, Avatar, Name } from '../styles/simple_layout/author'

type TProps = {
  //
}

const Author: FC<TProps> = () => {
  const avatarLayout = useAvatarLayout()
  const user = mockUsers(1)[0]

  return (
    <Wrapper>
      <Avatar src={user.avatar} avatarLayout={avatarLayout} />
      <Name>{user.nickname}</Name>
    </Wrapper>
  )
}

export default observer(Author)
