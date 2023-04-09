import { FC, memo } from 'react'

import Link from 'next/link'

import type { TCommunity } from '@/spec'

import useAccount from '@/hooks/useAccount'
import { ROUTE } from '@/constant/route'
// import { callSubscriber, callAuth } from '@/utils/signal'
import { callAuth } from '@/utils/signal'

import { Wrapper, DashboardIcon, Avatar, AccountIcon } from '../styles/simple_layout/account_unit'

type TProps = {
  community: TCommunity
}

const AccountUnit: FC<TProps> = ({ community }) => {
  const accountInfo = useAccount()

  return (
    <Wrapper>
      {/* <SubscribeButton type="primary" ghost size="small" onClick={callSubscriber}>
        订阅
      </SubscribeButton> */}

      <Link href={`/${community.raw}/${ROUTE.DASHBOARD.DASHBOARD}`} prefetch={false}>
        <DashboardIcon />
      </Link>

      {/* <div data-test-id="header-notify-icon">
        <NotifyIcon />
      </div> */}

      {accountInfo?.login ? (
        <Avatar src={accountInfo.avatar} />
      ) : (
        <AccountIcon onClick={callAuth} />
      )}
    </Wrapper>
  )
}

export default memo(AccountUnit)
