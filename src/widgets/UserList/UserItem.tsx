import type { FC } from 'react'

import type { TUser } from '~/spec'

import { assetSrc } from '~/helper'
import useLayout from '~/hooks/useLayout'
import { Wrapper, Avatar, Main, Header, Title, Login, Bio } from './styles/user_item'

type TProps = {
  user: TUser
}

const UserItem: FC<TProps> = ({ user }) => {
  const { avatarLayout } = useLayout()

  return (
    <Wrapper>
      <Avatar src={assetSrc(user.avatar)} $avatarLayout={avatarLayout} />
      <Main>
        <Header>
          <Title>{user.nickname}</Title>
          <Login>{user.login}</Login>
        </Header>
        <Bio>{user.bio}</Bio>
      </Main>
    </Wrapper>
  )
}

export default UserItem
