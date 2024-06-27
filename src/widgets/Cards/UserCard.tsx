/*
 * cards for user
 */

import type { FC } from 'react'

import type { TAccount, TUser } from '~/spec'
import useLayout from '~/hooks/useLayout'

import { cutRest } from '~/fmt'

import {
  Wrapper,
  Avatar,
  Info,
  // ShortBio,
  Header,
  Title,
  Nickname,
  Login,
  Desc,
} from './styles/user_card'

type TProps = {
  user: TUser | TAccount
}

const UserCard: FC<TProps> = ({ user }) => {
  const { avatar, nickname, login, bio } = user

  const { avatarLayout } = useLayout()

  return (
    <Wrapper>
      <Header>
        <Avatar src={avatar} $avatarLayout={avatarLayout} />
        <Info>
          <Title href={`user/${login}`} prefetch={false}>
            <Nickname>{cutRest(nickname, 12)}</Nickname>
            <Login>{login}</Login>
          </Title>
          {/* <ShortBio>{bio || '--'}</ShortBio> */}
        </Info>
      </Header>
      <Desc>{cutRest(bio, 50)}</Desc>
    </Wrapper>
  )
}

export default UserCard
