/* *
 * KanbanThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import CustomScroller from '@/widgets/CustomScroller'

import Actions from './Actions'
import Columns from './Columns'

import { useStore } from './store'
import { Wrapper, ColumnsWrapper, MobileColumnsWrapper, MobileColumnsInner } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:KanbanThread')

type TProps = {
  isSidebarLayout?: boolean
}

const KanbanThread: FC<TProps> = ({ isSidebarLayout = false }) => {
  const store = useStore()
  useInit(store)

  const { layout, kanbanBgColors, todoPosts, wipPosts, donePosts } = store

  return (
    <Wrapper testid="kanban-thread" isSidebarLayout={isSidebarLayout}>
      <Actions />
      <ColumnsWrapper>
        <Columns
          layout={layout}
          bgColors={kanbanBgColors}
          todoPosts={todoPosts}
          wipPosts={wipPosts}
          donePosts={donePosts}
        />
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
            <Columns
              layout={layout}
              bgColors={kanbanBgColors}
              todoPosts={todoPosts}
              wipPosts={wipPosts}
              donePosts={donePosts}
            />
          </MobileColumnsInner>
        </CustomScroller>
      </MobileColumnsWrapper>
    </Wrapper>
  )
}

export default observer(KanbanThread)
