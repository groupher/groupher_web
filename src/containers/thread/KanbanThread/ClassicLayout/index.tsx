/* *
 * KanbanThread
 */

import useIsSidebarLayout from '@/hooks/useIsSidebarLayout'
import CustomScroller from '@/widgets/CustomScroller'

import Actions from './Actions'
import Columns from './Columns'

import {
  Wrapper,
  ColumnsWrapper,
  MobileColumnsWrapper,
  MobileColumnsInner,
} from '../styles/classic_layout'

export default () => {
  const isSidebarLayout = useIsSidebarLayout()

  return (
    <Wrapper $testid="kanban-thread" isSidebarLayout={isSidebarLayout}>
      <Actions />
      <ColumnsWrapper>
        <Columns />
      </ColumnsWrapper>
      <MobileColumnsWrapper>
        <CustomScroller
          direction="horizontal"
          width="750px"
          autoHide={false}
          barSize="medium"
          showShadow={false}
        >
          <MobileColumnsInner>
            <Columns />
          </MobileColumnsInner>
        </CustomScroller>
      </MobileColumnsWrapper>
    </Wrapper>
  )
}
