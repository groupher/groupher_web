import { FC, memo } from 'react'

import type { TColorName, TKanbanLayout } from '@/spec'

import { Divider } from '@/widgets/Common'

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
      <Divider top={50} bottom={60} />
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
