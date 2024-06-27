import type { FC } from 'react'

import type { TAccount } from '~/spec'
import useLayout from '~/hooks/useLayout'

import { SpaceGrow } from '~/widgets/Common'

import {
  Wrapper,
  ExpandWrapper,
  HintText,
  UserAvatar,
  UnloginUser,
  LeaveResponseText,
  LeaveResponseUsername,
  PenIcon,
} from '../styles/editor/header'

import { openEditor } from '../logic'

type TProps = {
  accountInfo: TAccount
  showEditor: boolean
}

const EditorHeader: FC<TProps> = ({ accountInfo, showEditor }) => {
  const { avatarLayout } = useLayout()

  if (showEditor) {
    return (
      <ExpandWrapper>
        <HintText>创建评论:</HintText>
        <UserAvatar src={accountInfo.avatar} $avatarLayout={avatarLayout} />
        <LeaveResponseUsername>{accountInfo.nickname}</LeaveResponseUsername>
      </ExpandWrapper>
    )
  }
  return (
    <Wrapper onClick={openEditor}>
      {accountInfo.avatar ? (
        <UserAvatar src={accountInfo.avatar} $avatarLayout={avatarLayout} />
      ) : (
        <UnloginUser />
      )}
      <LeaveResponseText>欢迎参与进来一起讨论 ~</LeaveResponseText>
      <SpaceGrow />
      <PenIcon />
    </Wrapper>
  )
}

export default EditorHeader
