import { FC, memo, useEffect, useState, useRef } from 'react'

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
} from '../../styles/layout/kanban_layout/board_layout'
import { edit } from '../../logic'

type TProps = Omit<TPropsBase, 'isTouched'>

const BoardLayout: FC<TProps> = ({ kanbanBgColors, isBgColorsTouched, saving }) => {
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
        isTouched={isBgColorsTouched}
        field={SETTING_FIELD.KANBAN_BG_COLORS}
        loading={saving}
        top={40}
      />
    </>
  )
}

export default memo(BoardLayout)
