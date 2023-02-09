import { FC, memo, useState } from 'react'

import { DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import { COLOR_NAME } from '@/constant/colors'

import { callDashboardDesc } from '@/utils/signal'
import { randomBgNames } from '@/utils/helper'

import useHover from '@/hooks/useHover'

import { Inline, SpaceGrow, Space } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

import { SETTING_FIELD } from '../../constant'
import SectionLabel from '../../SectionLabel'
import SavingBar from '../../SavingBar'

import KanbanItem from './KanbanItem'

import type { TProps } from '.'

import {
  BoardsWrapper,
  Board,
  ColorsWrapper,
  Preset,
  ColorBall,
  Action,
  DiceIcon,
} from '../../styles/layout/kanban_layout/board_layout'
import { edit } from '../../logic'

const BoardLayout: FC<TProps> = ({ kanbanBgColors, isTouched, saving }) => {
  const [diceRotate, setDiceRotate] = useState(0)

  const [board1Ref, isBoard1Hovered] = useHover<HTMLDivElement>()
  const [board2Ref, isBoard2Hovered] = useHover<HTMLDivElement>()
  const [board3Ref, isBoard3Hovered] = useHover<HTMLDivElement>()

  const [BG1, BG2, BG3] = kanbanBgColors

  return (
    <>
      <SectionLabel
        title="看板背景色"
        desc={
          <>
            看板背景颜色，与标签颜色无关联。默认为灰色。
            <Inline>
              <ArrowButton
                onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}
                size="small"
                linkColor
              >
                查看示例
              </ArrowButton>
            </Inline>
          </>
        }
      />

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

        <Action
          onClick={() => {
            setDiceRotate(diceRotate + 80)
            edit(randomBgNames(3), 'kanbanBgColors')
          }}
        >
          <DiceIcon rotate={diceRotate} /> 随缘
        </Action>
        <Space right={0} />
      </ColorsWrapper>

      <BoardsWrapper>
        <Board color={BG1} $active={isBoard1Hovered}>
          <KanbanItem count={17} />
          <KanbanItem opacity={0.85} count={4} width={60} />
          <KanbanItem opacity={0.75} count={6} width={40} />
          <KanbanItem opacity={0.65} count={13} width={70} />
          <KanbanItem opacity={0.55} count={6} width={40} />
        </Board>
        <Board color={BG2} $active={isBoard2Hovered}>
          <KanbanItem count={21} width={60} />
          <KanbanItem opacity={0.85} count={11} width={60} />
          <KanbanItem opacity={0.75} count={16} width={80} />
          <KanbanItem opacity={0.65} count={21} width={110} />
          <KanbanItem opacity={0.55} count={11} width={60} />
        </Board>
        <Board color={BG3} $active={isBoard3Hovered}>
          <KanbanItem count={72} width={68} />
          <KanbanItem opacity={0.95} count={112} width={60} />
          <KanbanItem opacity={0.85} count={41} width={100} />
          <KanbanItem opacity={0.75} count={87} width={60} />
          <KanbanItem opacity={0.55} count={41} width={100} />
        </Board>
      </BoardsWrapper>

      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.KANBAN_LAYOUT}
        loading={saving}
        top={20}
      />
    </>
  )
}

export default memo(BoardLayout)
