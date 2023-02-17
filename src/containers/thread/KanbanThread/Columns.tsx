/* *
 * KanbanThread
 *
 */

import { FC, useEffect, useState } from 'react'

// import { buildLog } from '@/utils/logger'
import type { TKanbanLayout, TColorName } from '@/spec'
import { getRandomInt } from '@/utils/helper'

import { SpaceGrow } from '@/widgets/Common'
import IconButton from '@/widgets/Buttons/IconButton'
import KanbanItem from '@/widgets/KanbanItem'

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
}

const Columns: FC<TProps> = ({ layout, bgColors }) => {
  const [BG1, BG2, BG3] = bgColors

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <Column>
        <Header>
          <TODOIcon />
          <Label>待办</Label>
          <SubTitle>{loaded && getRandomInt(10, 20)}</SubTitle>
          <SpaceGrow />
          <IconButton path="shape/add.svg" right={12} />
        </Header>
        <Body color={BG1}>
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
          <SubTitle>{loaded && getRandomInt(10, 20)}</SubTitle>
          <SpaceGrow />
          <IconButton path="shape/add.svg" right={12} />
        </Header>
        <Body color={BG2}>
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
          <SubTitle>{loaded && getRandomInt(10, 20)}</SubTitle>
          <SpaceGrow />
          <IconButton path="shape/add.svg" right={12} />
        </Header>
        <Body color={BG3}>
          <KanbanItem layout={layout} />
          <KanbanItem layout={layout} />
          <KanbanItem layout={layout} />
          <KanbanItem layout={layout} />
          <KanbanItem layout={layout} />
          <KanbanItem layout={layout} />
        </Body>
      </Column>
    </>
  )
}

export default Columns
