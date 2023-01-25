import { FC, memo } from 'react'

import type { TUser, TAvatarLayout } from '@/spec'

import AdminAvatar from '@/widgets/AdminAvatar'

import { Wrapper, Info, Name, Bio } from '../styles/members/admin_member'

type TProps = {
  user: TUser
  avatarLayout: TAvatarLayout
}

const AdminMember: FC<TProps> = ({ user, avatarLayout }) => {
  return (
    <Wrapper>
      <AdminAvatar user={user} right={10} avatarLayout={avatarLayout} />
      <Info>
        <Name>{user.nickname}</Name>
        <Bio>{user.bio}</Bio>
      </Info>
    </Wrapper>
  )
}

export default memo(AdminMember)
