/*
 *
 * AdminAvatar
 *
 */

import type { FC } from 'react'

import type { TUser, TSpace } from '~/spec'
import useLayout from '~/hooks/useLayout'

import ImgFallback from '~/widgets/ImgFallback'

import { Wrapper, Avatar, BadgeWrapper, BadgeIcon } from './styles'

type TProps = {
  testid?: string
  user: TUser
} & TSpace

const AdminAvatar: FC<TProps> = ({ testid = 'admin-avatar', user, ...restProps }) => {
  const { avatarLayout } = useLayout()

  return (
    <Wrapper $testid={testid} {...restProps}>
      <Avatar
        src={user.avatar}
        $avatarLayout={avatarLayout}
        fallback={<ImgFallback size={40} user={user} />}
      />
      <BadgeWrapper $avatarLayout={avatarLayout}>
        <BadgeIcon />
      </BadgeWrapper>
    </Wrapper>
  )
}

export default AdminAvatar
