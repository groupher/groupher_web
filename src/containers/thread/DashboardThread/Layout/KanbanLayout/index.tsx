import { FC, memo } from 'react'

import type { TColorName, TKanbanLayout } from '@/spec'

import { SexyDivider } from '@/widgets/Common'

import ItemLayout from './ItemLayout'
import BoardLayout from './BoardLayout'

import { Wrapper } from '../../styles/layout/kanban_layout'

export type TProps = {
  layout: TKanbanLayout
  isTouched: boolean
  isBgColorsTouched: boolean
  saving: boolean
  kanbanBgColors: TColorName[]
}

const KanbanListLayout: FC<TProps> = ({
  layout,
  isTouched,
  isBgColorsTouched,
  kanbanBgColors,
  saving,
}) => {
  return (
    <Wrapper>
      <ItemLayout layout={layout} isTouched={isTouched} saving={saving} />
      <SexyDivider top={50} bottom={50} />
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
