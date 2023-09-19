import { FC, memo } from 'react'

import { THREAD } from '@/constant/thread'
import EVENT from '@/constant/event'

import { send } from '@/signal'
import { mockUsers } from '@/mock'

import { Wrapper, Avatar, NotifyIcon, DashboardIcon } from '../styles/classic_layout/account_unit'

const AccountUnit: FC = () => {
  // return <Wrapper>登入 / 注册</Wrapper>
  return (
    <Wrapper>
      <DashboardIcon
        onClick={() => send(EVENT.COMMUNITY_THREAD_CHANGE, { data: THREAD.DASHBOARD })}
      />

      <NotifyIcon />
      <Avatar src={`${mockUsers(1)[0].avatar}`} />
    </Wrapper>
  )
}

export default memo(AccountUnit)
