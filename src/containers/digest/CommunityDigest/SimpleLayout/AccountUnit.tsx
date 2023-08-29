import { FC, memo } from 'react'

import type { TCommunity } from '@/spec'

import useAccount from '@/hooks/useAccount'
import { callAuth } from '@/utils/signal'

import {
  Wrapper,
  Avatar,
  AccountIcon,
  GithubItem,
  GithubIcon,
} from '../styles/simple_layout/account_unit'

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

      <GithubItem href="/">
        <GithubIcon /> <div>19.5k</div>
      </GithubItem>

      {/* <DashboardLink href={`/${community.slug}/${ROUTE.DASHBOARD.DASHBOARD}`} prefetch={false}>
        <DashboardIcon />
      </DashboardLink> */}

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
