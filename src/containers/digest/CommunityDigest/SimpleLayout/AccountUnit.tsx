import { FC, memo } from 'react'

import Link from 'next/link'

import { ROUTE } from '@/constant'

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
  return (
    <Wrapper>
      <SubscribeButton type="primary" ghost size="small">
        订阅
      </SubscribeButton>

      <Link href={`/home/${ROUTE.DASHBOARD}`} prefetch={false}>
        <DashboardIcon />
      </Link>

      <div data-test-id="header-notify-icon">
        <NotifyIcon />
      </div>
      <Avatar src={`${mockUsers(1)[0].avatar}`} />
    </Wrapper>
  )
}

export default memo(AccountUnit)
