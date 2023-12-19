import { FC, memo } from 'react'

import type { TColorName, TKanbanLayout, TKanbanCardLayout } from '@/spec'

import { KANBAN_LAYOUT } from '@/constant/layout'
import { Br } from '@/widgets/Common'

import GlobalLayout from './GlobalLayout'
import ItemCardLayout from './ItemCardLayout'
import BoardLayout from './BoardLayout'

import { Wrapper } from '../../styles/layout/kanban_layout'

export type TProps = {
  layout: TKanbanLayout
  cardLayout: TKanbanCardLayout
  isTouched: boolean
  isCardTouched: boolean
  isBgColorsTouched: boolean
  saving: boolean
  kanbanBgColors: TColorName[]
}

const KanbanListLayout: FC<TProps> = ({
  layout,
  cardLayout,
  isTouched,
  isCardTouched,
  isBgColorsTouched,
  kanbanBgColors,
  saving,
}) => {
  return (
    <Wrapper>
      <GlobalLayout layout={layout} isTouched={isTouched} saving={saving} />

      {layout === KANBAN_LAYOUT.CLASSIC && (
        <ItemCardLayout cardLayout={cardLayout} isTouched={isCardTouched} saving={saving} />
      )}

      <Br top={50} />
      <BoardLayout
        layout={layout}
        kanbanBgColors={kanbanBgColors}
        isBgColorsTouched={isBgColorsTouched}
        saving={saving}
      />
    </Wrapper>
  )
}

export default memo(KanbanListLayout)
