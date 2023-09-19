import { Fragment, FC, memo } from 'react'

import type { TAccount } from '@/spec'

import { authWarn, logout } from '@/signal'

import Tooltip from '@/widgets/Tooltip'

import {
  Wrapper,
  PopMenu,
  MenuItem,
  MenuLink,
  LoginBadge,
  LoginDesc,
  LoginName,
  DefaultUserIcon,
  LogoutItem,
  AvatarIcon,
  MenuDivider,
  // MembershipHint,
} from './styles/user_account'

type TProps = {
  accountInfo: TAccount
}

const UserAccount: FC<TProps> = ({ accountInfo }) => {
  // const router = useRouter()

  return (
    <Fragment>
      {accountInfo?.isLogin ? (
        <Tooltip
          placement="bottom-end"
          trigger="click"
          hideOnClick={false}
          content={
            <PopMenu>
              <LoginBadge>
                <LoginDesc>Github 登陆:</LoginDesc>
                <LoginName>{accountInfo.login}</LoginName>
              </LoginBadge>
              <MenuDivider />
              <MenuLink href={`/u/${accountInfo.login}`} rel="noopener noreferrer" target="_blank">
                我的主页
              </MenuLink>
              <MenuItem>帮助</MenuItem>
              <LogoutItem onClick={() => logout()}>登出</LogoutItem>
            </PopMenu>
          }
        >
          <Wrapper testid="header-login-user">
            <AvatarIcon src={accountInfo.avatar} />
          </Wrapper>
        </Tooltip>
      ) : (
        <Wrapper testid="header-unlogin-user" onClick={() => authWarn()}>
          <DefaultUserIcon />
        </Wrapper>
      )}
    </Fragment>
  )
}

export default memo(UserAccount)
