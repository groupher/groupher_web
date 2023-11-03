import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TModerator } from '@/spec'
import useAvatarLayout from '@/hooks/useAvatarLayout'
import { mockUsers } from '@/mock'

import ImgFallback from '@/widgets/ImgFallback'
import NoteTip from '@/widgets/NoteTip'
import { SexyDivider as Divider } from '@/widgets/Common'

import AdminMember from './AdminMember'

import {
  Wrapper,
  Block,
  Header,
  Title,
  AdminsRow,
  Admin,
  JoinersRow,
  JoinersAvatar,
} from '../styles/members'

type TProps = {
  moderators: TModerator[]
}

const Members: FC<TProps> = ({ moderators }) => {
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper>
      <Block>
        <Header>
          <Title>社区管理员</Title>
        </Header>
        <AdminsRow>
          {moderators.map((moderator: TModerator) => (
            <Admin key={moderator.user.login}>
              <AdminMember user={moderator.user} />
            </Admin>
          ))}
        </AdminsRow>
      </Block>

      <Divider bottom={40} top={30} />

      <Block>
        <Header>
          <Title>
            参与互动
            <NoteTip fontSize={14} left={4} placement="right" offset={[-6, 10]}>
              参与发布，投票，评论，以及 Emoji 反馈的用户
            </NoteTip>
          </Title>
        </Header>
        <JoinersRow>
          {mockUsers(15).map((user) => (
            <JoinersAvatar
              key={user.id}
              src={user.avatar}
              $avatarLayout={avatarLayout}
              fallback={<ImgFallback size={26} user={user} />}
            />
          ))}
          {mockUsers(15).map((user) => (
            <JoinersAvatar
              key={user.id}
              src={user.avatar}
              $avatarLayout={avatarLayout}
              fallback={<ImgFallback size={26} user={user} />}
            />
          ))}
        </JoinersRow>
      </Block>
    </Wrapper>
  )
}

export default observer(Members)
