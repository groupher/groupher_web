import { FC, memo, useState } from 'react'

import type { TColorName } from '@/spec'
import { DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import { callDashboardDesc } from '@/utils/signal'

import { Inline, SpaceGrow, Space, LineDivider } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
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
  Panel,
  ColorsWrapper,
  Preset,
  ColorBall,
  Action,
  DiceIcon,
  ArrowIcon,
} from '../../styles/layout/kanban_layout/board_layout'
import { COLOR_NAME } from '@/constant'
import { edit } from '../../logic'

const BoardLayout: FC<TProps> = ({ kanbanBgColors, isTouched, saving }) => {
  const [diceRotate, setDiceRotate] = useState(0)
  const [presetActive, setPresetActive] = useState(false)

  const [BG1, BG2, BG3] = kanbanBgColors

  return (
    <>
      <SectionLabel
        title="看板背景色"
        desc={
          <>
            「看板」背景色，默认为灰色。
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
            activeColor={BG1 as TColorName}
            onChange={(color) => edit([color, BG2, BG3], 'kanbanBgColors')}
            placement="bottom-start"
            offset={[-10, 10]}
            bgMode
          >
            <ColorBall color={BG1 as TColorName} setable />
          </ColorSelector>

          <ColorSelector
            activeColor={BG2 as TColorName}
            onChange={(color) => edit([BG1, color, BG3], 'kanbanBgColors')}
            placement="bottom-start"
            offset={[-10, 10]}
            bgMode
          >
            <ColorBall color={BG2 as TColorName} setable />
          </ColorSelector>

          <ColorSelector
            activeColor={BG3 as TColorName}
            onChange={(color) => edit([BG1, BG2, color], 'kanbanBgColors')}
            placement="bottom-start"
            offset={[-10, 10]}
            bgMode
          >
            <ColorBall color={BG3 as TColorName} setable />
          </ColorSelector>
        </Preset>

        <SpaceGrow />

        <Action
          onClick={() => {
            setDiceRotate(diceRotate + 80)
          }}
        >
          <DiceIcon rotate={diceRotate} /> 随机
        </Action>

        <LineDivider left={1} right={1} />

        <Tooltip
          content={
            <Panel>
              <Preset>
                <ColorBall color={COLOR_NAME.BLUE} />
                <ColorBall color={COLOR_NAME.PURPLE} />
                <ColorBall color={COLOR_NAME.YELLOW} />
              </Preset>

              <Preset>
                <ColorBall color={COLOR_NAME.RED} />
                <ColorBall color={COLOR_NAME.YELLOW} />
                <ColorBall color={COLOR_NAME.GREEN} />
              </Preset>

              <Preset>
                <ColorBall color={COLOR_NAME.BLUE} />
                <ColorBall color={COLOR_NAME.PURPLE} />
                <ColorBall color={COLOR_NAME.YELLOW} />
              </Preset>
            </Panel>
          }
          placement="bottom-end"
          trigger="mouseenter focus"
          offset={[-5, 5]}
          onShow={() => setPresetActive(true)}
          onHide={() => setPresetActive(false)}
          noPadding
        >
          <Action $active={presetActive}>
            预设 <ArrowIcon />
          </Action>
        </Tooltip>

        <Space right={0} />
      </ColorsWrapper>

      <BoardsWrapper>
        <Board color={BG1 as TColorName}>
          <KanbanItem count={17} />
          <KanbanItem opacity={0.85} count={4} width={60} />
          <KanbanItem opacity={0.75} count={6} width={40} />
          <KanbanItem opacity={0.65} count={13} width={70} />
        </Board>
        <Board color={BG2 as TColorName}>
          <KanbanItem count={21} width={60} />
          <KanbanItem opacity={0.85} count={11} width={60} />
          <KanbanItem opacity={0.75} count={16} width={80} />
          <KanbanItem opacity={0.65} count={21} width={110} />
        </Board>
        <Board color={BG3 as TColorName}>
          <KanbanItem count={72} width={68} />
          <KanbanItem opacity={0.95} count={112} width={60} />
          <KanbanItem opacity={0.85} count={41} width={100} />
          <KanbanItem opacity={0.75} count={87} width={60} />
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
