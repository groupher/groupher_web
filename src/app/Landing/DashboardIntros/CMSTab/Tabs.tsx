import { FC } from 'react'

import { Space, SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  PostItem,
  KanbanItem,
  ChangelogItem,
  DocItem,
  UserItem,
  BottomItem,
  FilterBox,
  FilterIcon,
  TimeIcon,
  FilterTitle,
  CatIcon,
  StateIcon,
} from '../../styles/dashboard_intros/cms_tab/tabs'

const Tabs: FC = () => {
  return (
    <Wrapper>
      <PostItem>讨论区</PostItem>
      <KanbanItem>看板</KanbanItem>
      <ChangelogItem>更新日志</ChangelogItem>
      <DocItem>帮助台</DocItem>
      <UserItem>成员</UserItem>
      <BottomItem>
        <FilterBox>
          <FilterIcon />
        </FilterBox>
        <TimeIcon />
        <FilterTitle>本周</FilterTitle>
        <Space right={10} />
        <CatIcon />
        <FilterTitle>功能请求</FilterTitle>
        <Space right={10} />
        <StateIcon />
        <FilterTitle>进行中</FilterTitle>
        <SpaceGrow />
        <FilterTitle>1 / 9</FilterTitle>
      </BottomItem>
    </Wrapper>
  )
}

export default Tabs
