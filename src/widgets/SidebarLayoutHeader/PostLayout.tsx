/*
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react'

import useAccount from '@/hooks/useAccount'
import useAvatarLayout from '@/hooks/useAvatarLayout'

import { SpaceGrow, SexyDivider } from '@/widgets/Common'

import {
  Wrapper,
  InnerWrapper,
  Menu,
  MenuItem,
  MainArea,
  AccountIcon,
  AccountAvatar,
  Icon,
} from './styles/post_layout'

type TProps = {
  testid?: string
}

const PostLayout: FC<TProps> = ({ testid = 'sidebar-layout-header' }) => {
  const accountInfo = useAccount()
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper>
      <InnerWrapper testid={testid}>
        <MainArea>
          <Menu>
            <Icon.Discuss />
            <MenuItem>搜索内容</MenuItem>
          </Menu>
          <SpaceGrow />
          {accountInfo.isLogin ? (
            <AccountAvatar src={accountInfo.avatar} avatarLayout={avatarLayout} />
          ) : (
            <AccountIcon />
          )}
        </MainArea>
      </InnerWrapper>

      <SexyDivider />
    </Wrapper>
  )
}

export default observer(PostLayout)
