import { FC, memo } from 'react'

import type { TKanbanLayout } from '@/spec'

import ItemLayout from './ItemLayout'
import { Wrapper } from '../../styles/layout/kanban_layout'

export type TProps = {
  layout: TKanbanLayout
  isTouched: boolean
  saving: boolean
}

const KanbanListLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  return (
    <Wrapper>
      <ItemLayout layout={layout} isTouched={isTouched} saving={saving} />
    </Wrapper>
  )
}

export default memo(KanbanListLayout)
