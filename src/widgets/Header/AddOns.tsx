import { type FC, memo } from 'react'

import type { TAccount } from '@/spec'
import EVENT from '@/const/event'

import { send, c11nSettings } from '@/signal'

import UserAccount from './UserAccount'

import {
  Wrapper,
  SettingIcon,
  Divider,
  Operations,
  Search,
  HeaderSearchIcon,
} from './styles/addons'

type TProps = {
  accountInfo: TAccount
}
const AddOns: FC<TProps> = ({ accountInfo }) => {
  // TODO: move the login logic to MailBox itself
  // useEffect(() => {
  //   if (isLogin) {
  //     MailBox = dynamic(() => import('@/containers/tool/MailBox'), {
  //       /* eslint-disable react/display-name */
  //       loading: () => <div />,
  //       ssr: false,
  //     })
  //   }
  // }, [isLogin])

  return (
    <Wrapper>
      <div onKeyDown={() => c11nSettings()}>
        <SettingIcon />
      </div>
      <Divider>&nbsp;</Divider>
      <Operations>
        <Search onClick={() => send(EVENT.QUERY_DORAMON)} $testid="header-search">
          <HeaderSearchIcon $testid="header-search-icon" />
        </Search>

        <UserAccount accountInfo={accountInfo} />
      </Operations>
    </Wrapper>
  )
}

export default memo(AddOns)
