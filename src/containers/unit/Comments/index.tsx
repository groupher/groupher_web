/*
 *
 * Comments
 *
 */

import { type FC, useEffect } from 'react'

import { ANCHOR } from '~/const/dom'

// import NoticeBar from '~/widgets/NoticeBar'

import Editor from './Editor'
import List from './List'
// import LockedMessage from './LockedMessage'

import type { TAPIMode } from './spec'
import { API_MODE } from './constant'
import useLogic from './useLogic'
import { Wrapper } from './styles'

import HeadBar from './HeadBar'

type TProps = {
  apiMode?: TAPIMode
  locked?: boolean
}

const Comments: FC<TProps> = ({ locked = false, apiMode = API_MODE.ARTICLE }) => {
  const { pagedComments, getEditState, loadComments } = useLogic()

  useEffect(() => {
    loadComments()
  }, [])

  const editState = getEditState()
  const { totalCount } = pagedComments

  return (
    <Wrapper id={ANCHOR.COMMENTS_ID}>
      {apiMode === API_MODE.ARTICLE && <Editor editState={editState} />}

      {/* <br />
      <NoticeBar
        type="lock"
        content="关闭了讨论: 已解决"
        timestamp={new Date().toLocaleDateString()}
        user={{ nickname: 'Bot' }}
        isArticleAuthor={false}
      /> */}
      {totalCount > 0 && <HeadBar />}
      <List />
    </Wrapper>
  )
}

export default Comments
