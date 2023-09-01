import { FC, memo } from 'react'

import type { TAvatarLayout, TModerator } from '@/spec'
import { mockUsers } from '@/utils/mock'

import ImgFallback from '@/widgets/ImgFallback'
import NoteTip from '@/widgets/NoteTip'

import AdminMember from './AdminMember'

import {
  Wrapper,
  Block,
  BottomBlock,
  Header,
  Title,
  AdminsRow,
  Admin,
  JoinersRow,
  JoinersAvatar,
} from '../styles/members'

type TProps = {
  avatarLayout: TAvatarLayout
  moderators: TModerator[]
}

const Members: FC<TProps> = ({ avatarLayout, moderators }) => {
  return (
    <Wrapper>
      <Block>
        <Header>
          <Title>社区管理员</Title>
        </Header>
        <AdminsRow>
          {moderators.map((moderator: TModerator) => (
            <Admin key={moderator.user.login}>
              <AdminMember user={moderator.user} avatarLayout={avatarLayout} />
            </Admin>
          ))}
        </AdminsRow>
      </Block>

      <BottomBlock>
        <Header>
          <Title>
            参与者
            <NoteTip fontSize={14} left={4} top={2} placement="right" offset={[-6, 10]}>
              参与发布，投票，评论，以及 Emoji 反馈的用户
            </NoteTip>
          </Title>
        </Header>
        <JoinersRow>
          {mockUsers(15).map((user) => (
            <JoinersAvatar
              key={user.id}
              src={user.avatar}
              avatarLayout={avatarLayout}
              fallback={<ImgFallback size={26} user={user} avatarLayout={avatarLayout} />}
            />
          ))}
          {mockUsers(15).map((user) => (
            <JoinersAvatar
              key={user.id}
              src={user.avatar}
              avatarLayout={avatarLayout}
              fallback={<ImgFallback size={26} user={user} avatarLayout={avatarLayout} />}
            />
          ))}
        </JoinersRow>
      </BottomBlock>
    </Wrapper>
  )
}

export default memo(Members)
