/*
 *
 * AccountUnit
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import useAccount from '@/hooks/useAccount'
import useAvatarLayout from '@/hooks/useAvatarLayout'

import ImgFallback from '@/widgets/ImgFallback'

import { Avatar } from './styles/logged_in_account'

const _log = buildLog('c:AccountUnit:index')

type TProps = {
  withName?: boolean
} & TSpace

const LoggedInAccount: FC<TProps> = () => {
  const user = useAccount()
  const { avatar } = user
  const avatarLayout = useAvatarLayout()

  return (
    <Avatar
      src={avatar}
      $avatarLayout={avatarLayout}
      fallback={<ImgFallback size={18} user={user} />}
    />
  )
}

export default observer(LoggedInAccount)
