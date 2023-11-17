/* *
 * KanbanThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import CustomScroller from '@/widgets/CustomScroller'

import Actions from './Actions'
import Columns from './Columns'

import { Wrapper, ColumnsWrapper, MobileColumnsWrapper, MobileColumnsInner } from './styles'

// const log = buildLog('C:KanbanThread')

type TProps = {
  isSidebarLayout?: boolean
}

const KanbanThread: FC<TProps> = ({ isSidebarLayout = false }) => {
  return (
    <Wrapper testid="kanban-thread" isSidebarLayout={isSidebarLayout}>
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

export default observer(KanbanThread)
