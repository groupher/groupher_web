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

import { ROUTE } from '@/const/route'
import { signOut } from '@/oauth'
import { SexyDivider, SpaceGrow, LinkAble } from '@/widgets/Common'
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
          <MenuBar>使用指南</MenuBar>
          <MenuBar>
            快捷键
            <SpaceGrow />
            <Icon.Cmd />
          </MenuBar>
          {/* <MenuBar>主题?</MenuBar> */}
          <LinkAble href={ROUTE.APPLY_COMMUNITY} prefetch={false}>
            <MenuBar as="a">
              创建社区
              <SpaceGrow />
              <Icon.Add />
            </MenuBar>
          </LinkAble>
          <SexyDivider top={8} bottom={8} />
          <MenuBar onClick={() => signOut()}>
            登出
            <SpaceGrow />
            <Icon.Logout />
          </MenuBar>
        </Panel>
      }
      placement="bottom-end"
      trigger="click"
      noPadding
    >
      <Avatar
        src={avatar}
        $avatarLayout={avatarLayout}
        fallback={<ImgFallback size={18} user={user} />}
      />
    </Tooltip>
  )
}

export default observer(LoggedInAccount)
