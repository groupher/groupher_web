/*
 *
 * Comments
 *
 */

import type { FC } from 'react'

import { ANCHOR } from '~/const/dom'

// import NoticeBar from '~/widgets/NoticeBar'

import Editor from './Editor'
import List from './List'
// import LockedMessage from './LockedMessage'

import type { TAPIMode } from './spec'
import { useStore } from './store'
import { API_MODE } from './constant'
import { Wrapper } from './styles'
import { useInit } from './logic'

import HeadBar from './HeadBar'

type TProps = {
  apiMode?: TAPIMode
  locked?: boolean
}

const Comments: FC<TProps> = ({ locked = false, apiMode = API_MODE.ARTICLE }) => {
  const store = useStore()
  useInit(store, locked, apiMode)

  const { mode, pagedCommentsData, foldState, editState, repliesState, loading, basicState } = store

  const { isAllFolded } = foldState
  const { totalCount } = pagedCommentsData

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

      {totalCount > 0 && (
        <HeadBar
          apiMode={apiMode}
          isAllFolded={isAllFolded}
          basicState={basicState}
          mode={mode}
          loading={loading}
          editState={editState}
        />
      )}

      <List
        mode={mode}
        apiMode={apiMode}
        foldState={foldState}
        pagedComments={pagedCommentsData}
        repliesState={repliesState}
        loading={loading}
      />
    </Wrapper>
  )
}

export default Comments
