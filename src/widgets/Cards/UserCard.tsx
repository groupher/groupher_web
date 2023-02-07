/*
 * cards for user
 */

import { FC, memo } from 'react'

import type { TAccount, TAvatarLayout, TUser } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import { cutRest } from '@/utils/fmt'

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
  avatarLayout?: TAvatarLayout
}

const UserCard: FC<TProps> = ({ user, avatarLayout = AVATAR_LAYOUT.SQUARE }) => {
  const { avatar, nickname, login, bio } = user
  return (
    <Wrapper>
      <Header>
        <Avatar src={avatar} avatarLayout={avatarLayout} />
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

export default memo(UserCard)
