/* *
 * KanbanThread
 */

import useIsSidebarLayout from '@/hooks/useIsSidebarLayout'

import Actions from './Actions'
import Sections from './Sections'
import { Wrapper } from '../styles/waterfall_layout'

export default () => {
  const isSidebarLayout = useIsSidebarLayout()

  return (
    <Wrapper $testid="kanban-thread" isSidebarLayout={isSidebarLayout}>
      <Actions />
      <Sections />
    </Wrapper>
  )
}
