import { FC, useEffect } from 'react'

import { mockUsers } from '@/mock'

import useHover from '@/hooks/useHover'

import { ACTIVE_ITMES } from './constant'

import {
  Wrapper,
  InnerWrapper,
  Header,
  Item,
  Num,
  Avatar,
  Intro,
  Nickname,
  Desc,
  Highlight,
} from '../../styles/dashboard_intros/admins_tab/admins'

type TProps = {
  onHover: (state: boolean[]) => void
  userHover: boolean[]
}

const Admins: FC<TProps> = ({ onHover, userHover }) => {
  const users = mockUsers(4)
  const [user1Ref, user1Hovered] = useHover<HTMLDivElement>()
  const [user2Ref, user2Hovered] = useHover<HTMLDivElement>()
  const [user3Ref, user3Hovered] = useHover<HTMLDivElement>()

  // NOTE: add onHover in devps will cause parallax effect break, don't do it
  useEffect(() => {
    onHover([user1Hovered, user2Hovered, user3Hovered])
  }, [user1Hovered, user2Hovered, user3Hovered])

  return (
    <Wrapper>
      <Header>社区管理员 / 志愿者</Header>
      <InnerWrapper>
        <Item ref={user1Ref} $active={user1Hovered || userHover[0]}>
          <Avatar src={users[0].avatar} />
          <Intro>
            <Nickname>{users[0].nickname}</Nickname>
            <Highlight>Owner</Highlight>
          </Intro>
        </Item>

        <Item ref={user2Ref} $active={user2Hovered || userHover[1]}>
          <Avatar src={users[1].avatar} />
          <Intro>
            <Nickname>{users[1].nickname}</Nickname>
            <Desc>
              <Num>{ACTIVE_ITMES.user2.length}</Num> 项权限
            </Desc>
          </Intro>
        </Item>

        <Item ref={user3Ref} $active={user3Hovered || userHover[2]}>
          <Avatar src={users[2].avatar} />
          <Intro>
            <Nickname>{users[2].nickname}</Nickname>
            <Desc>
              <Num>{ACTIVE_ITMES.user3.length}</Num> 项权限
            </Desc>
          </Intro>
        </Item>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Admins
