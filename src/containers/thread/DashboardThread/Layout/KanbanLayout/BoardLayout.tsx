import { FC, memo, useEffect, useState, useRef } from 'react'

import { isEmpty } from 'ramda'

import { COLOR_NAME } from '@/constant/colors'
import { randomBgNames } from '@/helper'
import useHover from '@/hooks/useHover'

import { SpaceGrow, Space } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'

import { SETTING_FIELD, INIT_KANBAN_COLORS } from '../../constant'
import SectionLabel from '../../SectionLabel'
import SavingBar from '../../SavingBar'

import KanbanList from './KanbanList'

import type { TProps as TPropsBase } from '.'

import {
  BoardsWrapper,
  MobileBoardsWrapper,
  MobileBoardsInnerWrapper,
  Board,
  ColorsWrapper,
  Preset,
  ColorBall,
  Action,
  DiceIcon,
  ResetIcon,
} from '../../styles/layout/kanban_layout/board_layout'
import { edit } from '../../logic'

type TProps = Pick<TPropsBase, 'layout' | 'kanbanBgColors' | 'isBgColorsTouched' | 'saving'>

const BoardLayout: FC<TProps> = ({ layout, kanbanBgColors, isBgColorsTouched, saving }) => {
  const [diceRotate, setDiceRotate] = useState(0)

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

  const [board1Ref, isBoard1Hovered] = useHover<HTMLDivElement>()
  const [board2Ref, isBoard2Hovered] = useHover<HTMLDivElement>()
  const [board3Ref, isBoard3Hovered] = useHover<HTMLDivElement>()

  const [BG1, BG2, BG3] = isEmpty(kanbanBgColors) ? INIT_KANBAN_COLORS : kanbanBgColors

  return (
    <>
      <SectionLabel title="看板背景色" desc="看板页面每列的背景版颜色，默认为浅灰色。" />

      <ColorsWrapper>
        <Preset setable>
          <ColorSelector
            activeColor={BG1}
            onChange={(color) => edit([color, BG2, BG3], 'kanbanBgColors')}
            placement="right"
            offset={[-2, 1]}
            excepts={[COLOR_NAME.CYAN, COLOR_NAME.GREEN]}
            bgMode
          >
            <ColorBall ref={board1Ref} color={BG1} setable />
          </ColorSelector>

          <ColorSelector
            activeColor={BG2}
            onChange={(color) => edit([BG1, color, BG3], 'kanbanBgColors')}
            placement="right"
            offset={[-2, 1]}
            excepts={[COLOR_NAME.CYAN, COLOR_NAME.GREEN]}
            bgMode
          >
            <ColorBall ref={board2Ref} color={BG2} setable />
          </ColorSelector>

          <ColorSelector
            activeColor={BG3}
            onChange={(color) => edit([BG1, BG2, color], 'kanbanBgColors')}
            placement="right"
            offset={[-2, 1]}
            excepts={[COLOR_NAME.CYAN, COLOR_NAME.GREEN]}
            bgMode
          >
            <ColorBall ref={board3Ref} color={BG3} setable />
          </ColorSelector>
        </Preset>
        <SpaceGrow />
        <Action onClick={() => edit(INIT_KANBAN_COLORS, 'kanbanBgColors')}>
          <ResetIcon />
          重置
        </Action>
        <Space right={0} />
        <Action
          onClick={() => {
            setDiceRotate(diceRotate + 80)
            edit(randomBgNames(3), 'kanbanBgColors')
          }}
        >
          <DiceIcon rotate={diceRotate} /> 灵感
        </Action>
        <Space right={0} />
      </ColorsWrapper>

      <BoardsWrapper>
        <Board color={BG1} $active={isBoard1Hovered}>
          <KanbanList num={1} />
        </Board>
        <Board color={BG2} $active={isBoard2Hovered}>
          <KanbanList num={2} />
        </Board>
        <Board color={BG3} $active={isBoard3Hovered}>
          <KanbanList num={3} />
        </Board>
      </BoardsWrapper>
      <MobileBoardsWrapper ref={ref}>
        <MobileBoardsInnerWrapper>
          <Board color={BG1}>
            <KanbanList num={1} />
          </Board>
          <Board color={BG2}>
            <KanbanList num={2} />
          </Board>
          <Board color={BG3}>
            <KanbanList num={3} />
          </Board>
        </MobileBoardsInnerWrapper>
      </MobileBoardsWrapper>

      <SavingBar
        width="698px"
        isTouched={isBgColorsTouched}
        field={SETTING_FIELD.KANBAN_BG_COLORS}
        loading={saving}
        top={40}
      />
    </>
  )
}

export default memo(BoardLayout)
