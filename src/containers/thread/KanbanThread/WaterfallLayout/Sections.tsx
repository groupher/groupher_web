/* *
 * KanbanThread
 *
 */

import type { FC } from 'react'

import useKanbanPosts from '~/hooks/useKanbanPosts'
import useKanbanBgColors from '~/hooks/useKanbanBgColors'

import KanbanItem from '~/widgets/KanbanItem'
import EmptyItem from '~/widgets/KanbanItem/EmptyItem'

import {
  Wrapper,
  Column,
  Header,
  Body,
  Label,
  SubTitle,
  TODOIcon,
  WipIcon,
  DoneIcon,
  AddIcon,
} from '../styles/waterfall_layout/sections'

const Sections: FC = () => {
  const { todo: todoPosts, wip: wipPosts, done: donePosts } = useKanbanPosts()
  const [todoBg, wipBg, doneBg] = useKanbanBgColors()

  return (
    <Wrapper>
      <Column>
        <Header $color={todoBg}>
          <TODOIcon $color={todoBg} />
          <Label>待办</Label>
          <SubTitle $color={todoBg}>{todoPosts.totalCount} 项</SubTitle>
          <div className="grow" />
          <AddIcon />
        </Header>
        <Body>
          {todoPosts.totalCount === 0 && <EmptyItem />}
          {todoPosts.totalCount !== 0 &&
            todoPosts.entries.map((item) => <KanbanItem key={item.innerId} article={item} />)}
        </Body>
      </Column>
      <Column>
        <Header $color={wipBg}>
          <WipIcon $color={wipBg} />
          <Label>进行中</Label>
          <SubTitle $color={wipBg}>{wipPosts.totalCount} 项</SubTitle>
          <div className="grow" />
          <AddIcon />
        </Header>
        <Body>
          {wipPosts.totalCount === 0 && <EmptyItem />}

          {wipPosts.totalCount !== 0 &&
            wipPosts.entries.map((item) => <KanbanItem key={item.innerId} article={item} />)}
        </Body>
      </Column>
      <Column>
        <Header $color={doneBg}>
          <DoneIcon $color={doneBg} />
          <Label>已完成</Label>
          <SubTitle $color={doneBg}>{donePosts.totalCount} 项</SubTitle>
          <div className="grow" />
          <AddIcon />
        </Header>
        <Body>
          {donePosts.totalCount === 0 && <EmptyItem />}
          {donePosts.totalCount !== 0 &&
            donePosts.entries.map((item) => <KanbanItem key={item.innerId} article={item} />)}
        </Body>
      </Column>
    </Wrapper>
  )
}

export default Sections
