import { Fragment } from 'react'

import Pagi from '~/widgets/Pagi'
import { Br } from '~/widgets/Common'

import List from './List'

import useLogic from '../useLogic'
import { ListsWrapper } from '../styles/list'

export default () => {
  const { mode, apiMode, loading, getFoldState, getRepliesState, pagedComments, onPageChange } =
    useLogic()

  const foldState = getFoldState()
  const repliesState = getRepliesState()

  const { entries, totalCount, pageSize, pageNumber } = pagedComments
  const { foldedIds } = foldState

  return (
    <Fragment>
      <ListsWrapper>
        <List
          mode={mode}
          apiMode={apiMode}
          entries={entries}
          repliesState={repliesState}
          foldedIds={foldedIds}
        />
      </ListsWrapper>
      <Br bottom={50} />
      {!loading && (
        <Pagi
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={totalCount}
          onChange={onPageChange}
          showBottomMsg
          noMoreMsg="没有更多的讨论了"
          emptyMsg="目前还没有讨论"
        />
      )}
    </Fragment>
  )
}
