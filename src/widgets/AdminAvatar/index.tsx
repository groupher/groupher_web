/*
 *
 * AdminAvatar
 *
 */

import { FC, memo } from 'react'

import type { TUser, TSpace, TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/utils/logger'

import ImgFallback from '@/widgets/ImgFallback'

import { Wrapper, Avatar, BadgeWrapper, BadgeIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:AdminAvatar:index')

type TProps = {
  testid?: string
  user: TUser
  avatarLayout?: TAvatarLayout
} & TSpace

const AdminAvatar: FC<TProps> = ({
  testid = 'admin-avatar',
  user,
  avatarLayout = AVATAR_LAYOUT.SQUARE,
  ...restProps
}) => {
  return (
    <Wrapper testid={testid} {...restProps}>
      <Avatar
        src={user.avatar}
        avatarLayout={avatarLayout}
        fallback={<ImgFallback size={40} user={user} avatarLayout={avatarLayout} />}
      />
      <BadgeWrapper avatarLayout={avatarLayout}>
        <BadgeIcon />
      </BadgeWrapper>
    </Wrapper>
  )
}

export default memo(AdminAvatar)
