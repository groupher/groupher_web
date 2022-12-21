/* *
 * KanbanThread
 *
 */

import { FC, useEffect, useState } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'
import { getRandomInt } from '@/utils/helper'

import { SpaceGrow } from '@/widgets/Common'
import IconButton from '@/widgets/Buttons/IconButton'
import KanbanItem from '@/widgets/KanbanItem'

import Actions from './Actions'

import type { TStore } from './store'
import {
  Wrapper,
  ColumnsWrapper,
  Column,
  Header,
  Body,
  Label,
  SubTitle,
  TODOIcon,
  WipIcon,
  DoneIcon,
} from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:KanbanThread')

type TProps = {
  kanbanThread?: TStore
  testid?: string
}

const KanbanThreadContainer: FC<TProps> = ({ kanbanThread: store, testid = 'kanban-thread' }) => {
  useInit(store)

  const { layout } = store

  // see: https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <Wrapper testid={testid}>
      <Actions />
      <ColumnsWrapper>
        <Column>
          <Header>
            <TODOIcon />
            <Label>待办</Label>
            <SubTitle>{hydrated && getRandomInt(10, 20)}</SubTitle>
            <SpaceGrow />
            <IconButton path="shape/add.svg" right={12} />
          </Header>
          <Body>
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
          </Body>
        </Column>
        <Column>
          <Header>
            <WipIcon />
            <Label>进行中</Label>
            <SubTitle>{hydrated && getRandomInt(10, 20)}</SubTitle>
            <SpaceGrow />
            <IconButton path="shape/add.svg" right={12} />
          </Header>
          <Body>
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
          </Body>
        </Column>
        <Column>
          <Header>
            <DoneIcon />
            <Label>已完成</Label>
            <SubTitle>{hydrated && getRandomInt(10, 20)}</SubTitle>
            <SpaceGrow />
            <IconButton path="shape/add.svg" right={12} />
          </Header>
          <Body>
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
            <KanbanItem layout={layout} />
          </Body>
        </Column>
      </ColumnsWrapper>
    </Wrapper>
  )
}

export default bond(KanbanThreadContainer, 'kanbanThread') as FC<TProps>
