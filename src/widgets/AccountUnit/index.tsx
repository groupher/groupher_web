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

import { Wrapper, Avatar, UnloginIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:AccountUnit:index')

type TProps = {
  testid?: string
} & TSpace

const AccountUnit: FC<TProps> = ({ testid = 'account-unit', ...restProps }) => {
  const { isLogin, avatar } = useAccount()
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper {...restProps}>
      {isLogin ? <Avatar src={avatar} avatarLayout={avatarLayout} /> : <UnloginIcon />}
    </Wrapper>
  )
}

export default observer(AccountUnit)
