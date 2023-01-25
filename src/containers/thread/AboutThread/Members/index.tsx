import { FC, memo } from 'react'

import type { TAvatarLayout } from '@/spec'
import { mockUsers } from '@/utils/mock'

import AdminMember from './AdminMember'

import {
  Wrapper,
  Block,
  BottomBlock,
  Header,
  Title,
  Row,
  Admin,
  NormalAvatar,
} from '../styles/members'

type TProps = {
  avatarLayout: TAvatarLayout
}

const Members: FC<TProps> = ({ avatarLayout }) => {
  return (
    <Wrapper>
      <Block>
        <Header>
          <Title>团队成员</Title>
        </Header>
        <Row>
          {mockUsers(6).map((user) => (
            <Admin key={user.id}>
              <AdminMember user={user} avatarLayout={avatarLayout} />
            </Admin>
          ))}
        </Row>
      </Block>

      <BottomBlock>
        <Header>
          <Title>参与者</Title>
        </Header>
        <Row>
          {mockUsers(15).map((user) => (
            <NormalAvatar key={user.id} src={user.avatar} avatarLayout={avatarLayout} />
          ))}
          {mockUsers(15).map((user) => (
            <NormalAvatar key={user.id} src={user.avatar} avatarLayout={avatarLayout} />
          ))}
        </Row>
      </BottomBlock>
    </Wrapper>
  )
}

export default memo(Members)
