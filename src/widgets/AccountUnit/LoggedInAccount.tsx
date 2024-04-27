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

import { signOut } from '@/oauth'
import { SexyDivider, SpaceGrow } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
import ImgFallback from '@/widgets/ImgFallback'

import {
  Avatar,
  Panel,
  BaseInfo,
  UserName,
  LoginMethod,
  MenuBar,
  Icon,
} from './styles/logged_in_account'

const _log = buildLog('c:AccountUnit:index')

type TProps = {
  withName?: boolean
} & TSpace

const LoggedInAccount: FC<TProps> = () => {
  const user = useAccount()
  const { avatar } = user
  const avatarLayout = useAvatarLayout()

  return (
    <Tooltip
      content={
        <Panel>
          <BaseInfo>
            <UserName>{user.nickname}</UserName>
            <LoginMethod>via Github</LoginMethod>
          </BaseInfo>
          <MenuBar>
            账户设置
            <SpaceGrow />
            <Icon.Setting />
          </MenuBar>
          <MenuBar>个人主页</MenuBar>
          <SexyDivider top={8} bottom={8} />
          <MenuBar>
            创建社区
            <SpaceGrow />
            <Icon.Add />
          </MenuBar>
          <SexyDivider top={8} bottom={8} />
          <MenuBar>登出</MenuBar>
        </Panel>
      }
      placement="bottom-end"
      noPadding
    >
      <Avatar
        src={avatar}
        $avatarLayout={avatarLayout}
        fallback={<ImgFallback size={18} user={user} />}
        onClick={() => signOut()}
      />
    </Tooltip>
  )
}

export default observer(LoggedInAccount)
