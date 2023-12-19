import { FC, memo, useState } from 'react'

import { isEmpty } from 'ramda'

import { COLOR_NAME } from '@/constant/colors'
import { KANBAN_LAYOUT } from '@/constant/layout'
import { randomBgNames } from '@/helper'
import useHover from '@/hooks/useHover'

import { SpaceGrow, Space } from '@/widgets/Common'
import ColorSelector from '@/widgets/ColorSelector'

import { SETTING_FIELD, INIT_KANBAN_COLORS } from '../../../constant'
import SectionLabel from '../../../SectionLabel'
import SavingBar from '../../../SavingBar'

import ClassicLayout from './ClassicLayout'
import WaterfallLayout from './WaterfallLayout'

import type { TProps as TPropsBase } from '..'

import {
  ColorsWrapper,
  Preset,
  ColorBall,
  Action,
  DiceIcon,
  ResetIcon,
} from '../../../styles/layout/kanban_layout/bg_colors_setter'
import { edit } from '../../../logic'

type TProps = Pick<TPropsBase, 'layout' | 'kanbanBgColors' | 'isBgColorsTouched' | 'saving'>

const BoardLayout: FC<TProps> = ({ layout, kanbanBgColors, isBgColorsTouched, saving }) => {
  const [diceRotate, setDiceRotate] = useState(0)

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

      {layout === KANBAN_LAYOUT.CLASSIC ? (
        <ClassicLayout
          kanbanBgColors={kanbanBgColors}
          isBoard1Hovered={isBoard1Hovered}
          isBoard2Hovered={isBoard2Hovered}
          isBoard3Hovered={isBoard3Hovered}
        />
      ) : (
        <WaterfallLayout
          kanbanBgColors={kanbanBgColors}
          isBoard1Hovered={isBoard1Hovered}
          isBoard2Hovered={isBoard2Hovered}
          isBoard3Hovered={isBoard3Hovered}
        />
      )}

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
