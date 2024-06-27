import { type FC, useEffect, useRef } from 'react'

import { isEmpty } from 'ramda'

import { INIT_KANBAN_COLORS } from '~/const/dashboard'

import KanbanList from './KanbanList'

import useKanban from '../../../logic/useKanban'
import {
  BoardsWrapper,
  MobileBoardsWrapper,
  MobileBoardsInnerWrapper,
  Board,
} from '../../../styles/layout/kanban_layout/bg_colors_setter/classic_layout'

type TProps = {
  isBoard1Hovered: boolean
  isBoard2Hovered: boolean
  isBoard3Hovered: boolean
}

const ClassicLayout: FC<TProps> = ({ isBoard1Hovered, isBoard2Hovered, isBoard3Hovered }) => {
  const { kanbanBgColors } = useKanban()
  const ref = useRef(null)

  /*
   * reset when content visible
   * scroll to top always
   */
  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollLeft += 80
    }
  }, [ref])

  const [BG1, BG2, BG3] = isEmpty(kanbanBgColors) ? INIT_KANBAN_COLORS : kanbanBgColors

  return (
    <>
      <BoardsWrapper>
        <Board $color={BG1} $active={isBoard1Hovered}>
          <KanbanList num={1} />
        </Board>
        <Board $color={BG2} $active={isBoard2Hovered}>
          <KanbanList num={2} />
        </Board>
        <Board $color={BG3} $active={isBoard3Hovered}>
          <KanbanList num={3} />
        </Board>
      </BoardsWrapper>
      <MobileBoardsWrapper ref={ref}>
        <MobileBoardsInnerWrapper>
          <Board $color={BG1}>
            <KanbanList num={1} />
          </Board>
          <Board $color={BG2}>
            <KanbanList num={2} />
          </Board>
          <Board $color={BG3}>
            <KanbanList num={3} />
          </Board>
        </MobileBoardsInnerWrapper>
      </MobileBoardsWrapper>
    </>
  )
}

export default ClassicLayout
