import { FC } from 'react'

import Banner from './Banner'
import KanbanItem from './KanbanItem'

import { BoardsWrapper, Board } from '../../../styles/articles_intro_tabs/kanban_feat/kanban_demo'

const KanbanDemo: FC = () => {
  return (
    <>
      <Banner />
      <BoardsWrapper>
        <Board>
          <KanbanItem count={17} />
          <KanbanItem opacity={0.85} count={4} width={60} />
          <KanbanItem opacity={0.75} count={6} width={40} />
          <KanbanItem opacity={0.65} count={13} width={70} />
          <KanbanItem opacity={0.55} count={2} width={90} />
          <KanbanItem opacity={0.45} />
        </Board>
        <Board>
          <KanbanItem count={21} width={60} />
          <KanbanItem opacity={0.85} count={11} width={60} />
          <KanbanItem opacity={0.75} count={16} width={80} />
          <KanbanItem opacity={0.65} count={21} width={110} />
          <KanbanItem opacity={0.55} count={9} width={40} />
          <KanbanItem opacity={0.45} count={15} width={60} />
        </Board>
        <Board>
          <KanbanItem count={72} width={68} />
          <KanbanItem opacity={0.95} count={112} width={60} />
          <KanbanItem opacity={0.85} count={41} width={100} />
          <KanbanItem opacity={0.75} count={87} width={60} />
          <KanbanItem opacity={0.65} count={62} width={40} />
          <KanbanItem opacity={0.6} count={21} width={60} />
        </Board>
      </BoardsWrapper>
    </>
  )
}

export default KanbanDemo
