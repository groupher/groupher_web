/* *
 * KanbanThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useIsSidebarLayout from '@/hooks/useIsSidebarLayout'

import Actions from './Actions'
import Sections from './Sections'
import { Wrapper } from '../styles/waterfall_layout'

const WaterLayout: FC = () => {
  const isSidebarLayout = useIsSidebarLayout()

  return (
    <Wrapper $testid="kanban-thread" isSidebarLayout={isSidebarLayout}>
      <Actions />
      <Sections />
    </Wrapper>
  )
}

export default observer(WaterLayout)
