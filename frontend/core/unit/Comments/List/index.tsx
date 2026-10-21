import { Fragment, useMemo } from 'react'

import Controls from '../pagination/Controls'
import { useCommentsListState } from '../useLogic'
import CommentsList from './List'

export default function List() {
  const { mode, apiMode, entries, foldedCommentIds } = useCommentsListState()

  const foldedIdSet = useMemo(() => new Set(foldedCommentIds), [foldedCommentIds])

  return (
    <Fragment>
      <CommentsList mode={mode} apiMode={apiMode} entries={entries} foldedIdSet={foldedIdSet} />
      <div className='mb-14' />
      <Controls />
    </Fragment>
  )
}
