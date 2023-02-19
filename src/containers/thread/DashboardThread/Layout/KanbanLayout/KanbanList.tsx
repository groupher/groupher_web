import { FC, memo } from 'react'

import KanbanItem from './KanbanItem'

type TProps = {
  num: number
}

const KanbanList: FC<TProps> = ({ num }) => {
  switch (num) {
    case 1: {
      return (
        <>
          <KanbanItem count={17} />
          <KanbanItem opacity={0.85} count={4} width={60} />
          <KanbanItem opacity={0.75} count={6} width={40} />
          <KanbanItem opacity={0.65} count={13} width={70} />
          <KanbanItem opacity={0.55} count={6} width={40} />
        </>
      )
    }
    case 2: {
      return (
        <>
          <KanbanItem count={21} width={60} />
          <KanbanItem opacity={0.85} count={11} width={60} />
          <KanbanItem opacity={0.75} count={16} width={80} />
          <KanbanItem opacity={0.65} count={21} width={110} />
          <KanbanItem opacity={0.55} count={11} width={60} />
        </>
      )
    }

    default: {
      return (
        <>
          <KanbanItem count={72} width={68} />
          <KanbanItem opacity={0.95} count={112} width={60} />
          <KanbanItem opacity={0.85} count={41} width={100} />
          <KanbanItem opacity={0.75} count={87} width={60} />
          <KanbanItem opacity={0.55} count={41} width={100} />
        </>
      )
    }
  }
}

export default memo(KanbanList)
