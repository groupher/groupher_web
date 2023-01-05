import { FC, memo } from 'react'

import { THREAD } from '@/constant/thread'
import EVENT from '@/constant/event'

import { send } from '@/utils/signal'
import { mockUsers } from '@/utils/mock'

import {
  Wrapper,
  Avatar,
  NotifyIcon,
  DashboardIcon,
  SubscribeButton,
} from '../styles/classic_layout/account_unit'
// import { onShowEditorList, onShowSubscriberList, setViewport } from '../logic'

const AccountUnit: FC = () => {
  // return <Wrapper>登入 / 注册</Wrapper>
  return (
    <Wrapper>
      <SubscribeButton type="primary" ghost size="small">
        订阅
      </SubscribeButton>

      <DashboardIcon
        onClick={() => send(EVENT.COMMUNITY_THREAD_CHANGE, { data: THREAD.DASHBOARD })}
      />

      <NotifyIcon />
      <Avatar src={`${mockUsers(1)[0].avatar}`} />
    </Wrapper>
  )
}

export default memo(AccountUnit)
