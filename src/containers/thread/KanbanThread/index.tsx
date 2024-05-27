/* *
 * KanbanThread
 *
 */

import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useKanbanLayout from '@/hooks/useKanbanLayout'
import { KANBAN_LAYOUT } from '@/const/layout'

import WaterfallLayout from './WaterfallLayout'
import ClassicLayout from './ClassicLayout'

import { Wrapper } from './styles'

const KanbanThread: FC = () => {
  const kanbanLayout = useKanbanLayout()

  return (
    <Wrapper>
      {kanbanLayout === KANBAN_LAYOUT.WATERFALL ? <WaterfallLayout /> : <ClassicLayout />}
    </Wrapper>
  )
}

export default observer(KanbanThread)
