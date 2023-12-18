/* *
 * KanbanThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useIsSidebarLayout from '@/hooks/useIsSidebarLayout'

import Sections from './Sections'
import Sidebar from './Sidebar'

import { Wrapper } from '../styles/waterfall_layout'

// const log = buildLog('C:KanbanThread')

const WaterLayout: FC = () => {
  const isSidebarLayout = useIsSidebarLayout()

  return (
    <Wrapper $testid="kanban-thread" isSidebarLayout={isSidebarLayout}>
      <Sections />
      <Sidebar />
    </Wrapper>
  )
}

export default observer(WaterLayout)
