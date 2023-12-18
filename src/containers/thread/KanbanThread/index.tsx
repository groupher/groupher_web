/* *
 * KanbanThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { KANBAN_LAYOUT } from '@/constant/layout'

import WaterfallLayout from './WaterfallLayout'
import ClassicLayout from './ClassicLayout'

import { Wrapper } from './styles'

// const log = buildLog('C:KanbanThread')

const KanbanThread: FC = () => {
  const kanbanCardLayout = KANBAN_LAYOUT.CLASSIC

  return (
    <Wrapper>
      <WaterfallLayout />
      {/* <ClassicLayout /> */}
    </Wrapper>
  )
}

export default observer(KanbanThread)
