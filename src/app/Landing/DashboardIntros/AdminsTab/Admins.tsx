import { FC } from 'react'

import { mockUsers } from '@/mock'

import {
  Wrapper,
  Item,
  Avatar,
  Intro,
  Nickname,
  Desc,
  Highlight,
} from '../../styles/dashboard_intros/admins_tab/admins'

const Admins: FC = () => {
  const users = mockUsers(4)

  return (
    <Wrapper>
      <Item>
        <Avatar src={users[0].avatar} />
        <Intro>
          <Nickname>{users[0].nickname}</Nickname>
          <Highlight>Owner</Highlight>
        </Intro>
      </Item>

      <Item $active>
        <Avatar src={users[1].avatar} />
        <Intro>
          <Nickname>{users[1].nickname}</Nickname>
          <Desc>6 项权限</Desc>
        </Intro>
      </Item>

      <Item>
        <Avatar src={users[2].avatar} />
        <Intro>
          <Nickname>{users[2].nickname}</Nickname>
          <Desc>9 项权限</Desc>
        </Intro>
      </Item>
    </Wrapper>
  )
}

export default Admins
