import { FC, memo } from 'react'

import Link from 'next/link'

import { ROUTE } from '@/constant'
import { callSubscriber, callAuth } from '@/utils/signal'

import {
  Wrapper,
  DashboardIcon,
  NotifyIcon,
  SubscribeButton,
  AccountIcon,
} from '../styles/simple_layout/account_unit'
// import { mockUsers } from '@/utils/mock'
// import { onShowEditorList, onShowSubscriberList, setViewport } from '../logic'

const AccountUnit: FC = () => {
  return (
    <Wrapper>
      <SubscribeButton type="primary" ghost size="small" onClick={callSubscriber}>
        订阅
      </SubscribeButton>

      <Link href={`/home/${ROUTE.DASHBOARD.DASHBOARD}`} prefetch={false}>
        <DashboardIcon />
      </Link>

      <div data-test-id="header-notify-icon">
        <NotifyIcon />
      </div>
      <AccountIcon onClick={callAuth} />
      {/* <Avatar src={`${mockUsers(1)[0].avatar}`} onClick={callAuth} /> */}
    </Wrapper>
  )
}

export default memo(AccountUnit)
