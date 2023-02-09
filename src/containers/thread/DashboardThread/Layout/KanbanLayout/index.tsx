import { FC, memo } from 'react'

import type { TColorName, TKanbanLayout } from '@/spec'

import { Br } from '@/widgets/Common'

import ItemLayout from './ItemLayout'
import BoardLayout from './BoardLayout'

import { Wrapper } from '../../styles/layout/kanban_layout'

export type TProps = {
  layout: TKanbanLayout
  isTouched: boolean
  saving: boolean
  kanbanBgColors: TColorName[]
}

const KanbanListLayout: FC<TProps> = ({ layout, isTouched, kanbanBgColors, saving }) => {
  return (
    <Wrapper>
      <ItemLayout layout={layout} isTouched={isTouched} saving={saving} />
      <Br bottom={50} />
      <BoardLayout
        layout={layout}
        kanbanBgColors={kanbanBgColors}
        isTouched={isTouched}
        saving={saving}
      />
    </Wrapper>
  )
}

export default memo(KanbanListLayout)
