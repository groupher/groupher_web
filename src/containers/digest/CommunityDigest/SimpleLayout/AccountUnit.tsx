import { FC } from 'react'

import { observer } from 'mobx-react'

import type { TCommunity } from '@/spec'
import useAvatarLayout from '@/hooks/useAvatarLayout'

import useAccount from '@/hooks/useAccount'
import { callAuth } from '@/utils/signal'

import { Wrapper, Avatar, AccountIcon, GithubItem } from '../styles/simple_layout/account_unit'

type TProps = {
  community: TCommunity
}

const AccountUnit: FC<TProps> = ({ community }) => {
  const accountInfo = useAccount()

  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper>
      {/* <SubscribeButton type="primary" ghost size="small" onClick={callSubscriber}>
        订阅
      </SubscribeButton> */}

      <GithubItem href="/">
        {/* <GithubIcon /> */}
        {/* <div>19.5k</div> */}
        <img
          alt="GitHub Repo stars"
          src="https://img.shields.io/github/stars/vercel/next.js?style=social&logo=github&label=%20%20&labelColor=black&color=white"
        />
      </GithubItem>

      {/* <DashboardLink href={`/${community.slug}/${ROUTE.DASHBOARD.DASHBOARD}`} prefetch={false}>
        <DashboardIcon />
      </DashboardLink> */}

      {/* <div data-test-id="header-notify-icon">
        <NotifyIcon />
      </div> */}

      {accountInfo?.login ? (
        <Avatar src={accountInfo.avatar} avatarLayout={avatarLayout} />
      ) : (
        <AccountIcon onClick={callAuth} />
      )}
    </Wrapper>
  )
}

export default observer(AccountUnit)
