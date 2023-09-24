/*
 *
 * AccountUnit
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import useAccount from '@/hooks/useAccount'
import useAvatarLayout from '@/hooks/useAvatarLayout'

import { NormalWrapper, WithBgWrapper, Avatar, UnloginIcon, NickName } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:AccountUnit:index')

type TProps = {
  testid?: string
  withBg?: boolean
  withName?: boolean
} & TSpace

const AccountUnit: FC<TProps> = ({
  testid = 'account-unit',
  withBg = false,
  withName = false,
  ...restProps
}) => {
  const { isLogin, avatar, nickname } = useAccount()
  const avatarLayout = useAvatarLayout()

  const Wrapper = withBg ? WithBgWrapper : NormalWrapper

  return (
    <Wrapper {...restProps}>
      {isLogin ? <Avatar src={avatar} avatarLayout={avatarLayout} /> : <UnloginIcon />}
      {isLogin && withName && <NickName>{nickname}</NickName>}
    </Wrapper>
  )
}

export default observer(AccountUnit)
