/* *
 * KanbanThread
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'
import CustomScroller from '@/widgets/CustomScroller'

import Actions from './Actions'
import Columns from './Columns'

import type { TStore } from './store'
import { Wrapper, ColumnsWrapper, MobileColumnsWrapper, MobileColumnsInner } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:KanbanThread')

type TProps = {
  kanbanThread?: TStore
  testid?: string
  isSidebarLayout?: boolean
}

const KanbanThreadContainer: FC<TProps> = ({
  kanbanThread: store,
  testid = 'kanban-thread',
  isSidebarLayout = false,
}) => {
  useInit(store)

  const { layout, avatarLayout, kanbanBgColors } = store

  return (
    <Wrapper testid={testid} isSidebarLayout={isSidebarLayout}>
      <Actions avatarLayout={avatarLayout} />
      <ColumnsWrapper>
        <Columns layout={layout} bgColors={kanbanBgColors} />
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
            <Columns layout={layout} bgColors={kanbanBgColors} />
          </MobileColumnsInner>
        </CustomScroller>
      </MobileColumnsWrapper>
    </Wrapper>
  )
}

export default bond(KanbanThreadContainer, 'kanbanThread') as FC<TProps>
