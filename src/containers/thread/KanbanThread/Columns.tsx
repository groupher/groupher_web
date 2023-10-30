/* *
 * KanbanThread
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/logger'
import type { TKanbanLayout, TColorName, TPagedArticles } from '@/spec'

import { SpaceGrow } from '@/widgets/Common'
import IconButton from '@/widgets/Buttons/IconButton'
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
} from './styles/columns'

type TProps = {
  layout: TKanbanLayout
  bgColors: TColorName[]
  todoPosts: TPagedArticles
  wipPosts: TPagedArticles
  donePosts: TPagedArticles
}

const Columns: FC<TProps> = ({ layout, bgColors, todoPosts, wipPosts, donePosts }) => {
  const [BG1, BG2, BG3] = bgColors

  return (
    <>
      <Column>
        <Header>
          <TODOIcon $color={BG1} />
          <Label>待办</Label>
          <SubTitle>{todoPosts.totalCount}</SubTitle>
          <SpaceGrow />
          <IconButton path="shape/add.svg" right={12} />
        </Header>
        <Body color={BG1}>
          {todoPosts.totalCount === 0 && <EmptyItem />}

          {todoPosts.totalCount !== 0 &&
            todoPosts.entries.map((item) => (
              <KanbanItem key={item.innerId} layout={layout} article={item} />
            ))}
        </Body>
      </Column>
      <Column>
        <Header>
          <WipIcon $color={BG2} />
          <Label>进行中</Label>
          <SubTitle>{wipPosts.totalCount}</SubTitle>
          <SpaceGrow />
          <IconButton path="shape/add.svg" right={12} />
        </Header>
        <Body color={BG2}>
          {wipPosts.totalCount === 0 && <EmptyItem />}

          {wipPosts.totalCount !== 0 &&
            wipPosts.entries.map((item) => (
              <KanbanItem key={item.innerId} layout={layout} article={item} />
            ))}
        </Body>
      </Column>
      <Column>
        <Header>
          <DoneIcon $color={BG3} />
          <Label>已完成</Label>
          <SubTitle>{donePosts.totalCount}</SubTitle>
          <SpaceGrow />
          <IconButton path="shape/add.svg" right={12} />
        </Header>
        <Body color={BG3}>
          {donePosts.totalCount === 0 && <EmptyItem />}

          {donePosts.totalCount !== 0 &&
            donePosts.entries.map((item) => (
              <KanbanItem key={item.innerId} layout={layout} article={item} />
            ))}
        </Body>
      </Column>
    </>
  )
}

export default Columns
