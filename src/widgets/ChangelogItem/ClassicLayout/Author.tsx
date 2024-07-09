import type { FC } from 'react'

import type { TUser } from '~/spec'
import useLayout from '~/hooks/useLayout'

import { Wrapper, Avatar, Name } from '../styles/classic_layout/author'

type TProps = {
  user: TUser
}

const Author: FC<TProps> = ({ user }) => {
  const { avatarLayout } = useLayout()

  return (
    <Wrapper>
      <Avatar src={user.avatar} $avatarLayout={avatarLayout} />
      <Name>{user.nickname}</Name>
    </Wrapper>
  )
}

export default Author
