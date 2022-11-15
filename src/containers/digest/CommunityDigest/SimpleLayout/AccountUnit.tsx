import { FC, memo } from 'react'

import Link from 'next/link'

import {
  Wrapper,
  Avatar,
  DashboardIcon,
  NotifyIcon,
  SubscribeButton,
} from '../styles/simple_layout/account_unit'
import { mockUsers } from '@/utils/mock'
// import { onShowEditorList, onShowSubscriberList, setViewport } from '../logic'

const AccountUnit: FC = () => {
  // return <Wrapper>登入 / 注册</Wrapper>
  return (
    <Wrapper>
      <SubscribeButton type="primary" ghost size="small">
        订阅
      </SubscribeButton>

      <Link href="/home/dashboard">
        <DashboardIcon
          onClick={() => {
            // send(EVENT.COMMUNITY_THREAD_CHANGE, { data: THREAD.DASHBOARD })
          }}
        />
      </Link>

      <div data-test-id="header-notify-icon">
        <NotifyIcon />
      </div>
      <Avatar src={`${mockUsers(1)[0].avatar}`} />
    </Wrapper>
  )
}

export default memo(AccountUnit)
