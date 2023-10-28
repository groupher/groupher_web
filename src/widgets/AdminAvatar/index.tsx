/*
 *
 * AdminAvatar
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TUser, TSpace } from '@/spec'
import useAvatarLayout from '@/hooks/useAvatarLayout'
import { buildLog } from '@/logger'

import ImgFallback from '@/widgets/ImgFallback'

import { Wrapper, Avatar, BadgeWrapper, BadgeIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:AdminAvatar:index')

type TProps = {
  testid?: string
  user: TUser
} & TSpace

const AdminAvatar: FC<TProps> = ({ testid = 'admin-avatar', user, ...restProps }) => {
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper testid={testid} {...restProps}>
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

export default observer(AdminAvatar)
