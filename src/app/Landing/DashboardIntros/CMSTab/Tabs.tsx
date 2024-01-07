import { FC } from 'react'

import {
  Wrapper,
  PostItem,
  KanbanItem,
  ChangelogItem,
  DocItem,
  UserItem,
} from '../../styles/dashboard_intros/cms_tab/tabs'

const Tabs: FC = () => {
  return (
    <Wrapper>
      <PostItem>讨论区</PostItem>
      <KanbanItem>看板</KanbanItem>
      <ChangelogItem>更新日志</ChangelogItem>
      <DocItem>帮助台</DocItem>
      <UserItem>成员</UserItem>
    </Wrapper>
  )
}

export default Tabs
