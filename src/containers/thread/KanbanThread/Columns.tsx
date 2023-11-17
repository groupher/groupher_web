/* *
 * KanbanThread
 *
 */

import { FC } from 'react'

import useKanbanPosts from '@/hooks/useKanbanPosts'
import useKanbanBgColors from '@/hooks/useKanbanBgColors'

import { SpaceGrow } from '@/widgets/Common'
import KanbanItem from '@/widgets/KanbanItem'
import EmptyItem from '@/widgets/KanbanItem/EmptyItem'

import {
  Column,
  Header,
  Body,
  Label,
  SubTitle,
  TODOIcon,
  WipIcon,
  DoneIcon,
  AddIcon,
} from './styles/columns'

const Columns: FC = () => {
  const { todo: todoPosts, wip: wipPosts, done: donePosts } = useKanbanPosts()
  const [todoBg, wipBg, doneBg] = useKanbanBgColors()

  return (
    <>
      <Column>
        <Header>
          <TODOIcon $color={todoBg} />
          <Label>待办</Label>
          <SubTitle>{todoPosts.totalCount}</SubTitle>
          <SpaceGrow />
          <AddIcon />
        </Header>
        <Body color={todoBg}>
          {todoPosts.totalCount === 0 && <EmptyItem />}
          {todoPosts.totalCount !== 0 &&
            todoPosts.entries.map((item) => <KanbanItem key={item.innerId} article={item} />)}
        </Body>
      </Column>
      <Column>
        <Header>
          <WipIcon $color={wipBg} />
          <Label>进行中</Label>
          <SubTitle>{wipPosts.totalCount}</SubTitle>
          <SpaceGrow />
          <AddIcon />
        </Header>
        <Body color={wipBg}>
          {wipPosts.totalCount === 0 && <EmptyItem />}

          {wipPosts.totalCount !== 0 &&
            wipPosts.entries.map((item) => <KanbanItem key={item.innerId} article={item} />)}
        </Body>
      </Column>
      <Column>
        <Header>
          <DoneIcon $color={doneBg} />
          <Label>已完成</Label>
          <SubTitle>{donePosts.totalCount}</SubTitle>
          <SpaceGrow />
          <AddIcon />
        </Header>
        <Body color={doneBg}>
          {donePosts.totalCount === 0 && <EmptyItem />}

          {donePosts.totalCount !== 0 &&
            donePosts.entries.map((item) => <KanbanItem key={item.innerId} article={item} />)}
        </Body>
      </Column>
    </>
  )
}

export default Columns
