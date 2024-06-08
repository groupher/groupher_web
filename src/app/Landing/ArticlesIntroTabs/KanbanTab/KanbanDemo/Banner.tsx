import type { FC } from 'react'

import { mockUsers } from '@/mock'

import { SpaceGrow } from '@/widgets/Common'
import Facepile from '@/widgets/Facepile'

import {
  Wrapper,
  InnerWrapper,
  Header,
  Title,
  UsersWrapper,
  KanbenIcon,
  LabelBar,
  Bar,
  Item,
  Label,
  Icon1,
  Icon2,
  Icon3,
} from '../../../styles/articles_intro_tabs/kanban_tab/banner'

const Banner: FC = () => {
  const users = mockUsers(5)

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          <KanbenIcon />
          <Title>看板墙</Title>
          <Bar top={0} height={6} width={15} left={6} opacity={0.2} />
          <SpaceGrow />
          <UsersWrapper>
            <Facepile users={users} total={23} />
          </UsersWrapper>
        </Header>
        <LabelBar>
          <Item left={1} bottom={0}>
            <Icon1 />
            <Label>已计划</Label>
          </Item>

          <Item left={228} bottom={0}>
            <Icon2 />
            <Label>进行中</Label>
          </Item>

          <Item left={460} bottom={0}>
            <Icon3 />
            <Label>已完成</Label>
          </Item>
        </LabelBar>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Banner
