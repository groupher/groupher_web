/* *
 * KanbanThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import ClassicLayout from './ClassicLayout'

import { Wrapper } from './styles'

// const log = buildLog('C:KanbanThread')

const KanbanThread: FC = () => {
  const kanbanCardLayout = 'CLASSIC'

  return (
    <Wrapper>
      <ClassicLayout />
    </Wrapper>
  )
}

export default observer(KanbanThread)
