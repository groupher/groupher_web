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

import { NormalWrapper, WithNameWrapper, Avatar, UnloginIcon, NickName } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:AccountUnit:index')

type TProps = {
  testid?: string
  withName?: boolean
} & TSpace

const AccountUnit: FC<TProps> = ({ testid = 'account-unit', withName = false, ...restProps }) => {
  const { isLogin, avatar, nickname } = useAccount()
  const avatarLayout = useAvatarLayout()

  const Wrapper = withName ? WithNameWrapper : NormalWrapper

  return (
    <Wrapper {...restProps}>
      {isLogin ? <Avatar src={avatar} avatarLayout={avatarLayout} /> : <UnloginIcon />}
      {isLogin && withName && <NickName>{nickname}</NickName>}
    </Wrapper>
  )
}

export default observer(AccountUnit)
