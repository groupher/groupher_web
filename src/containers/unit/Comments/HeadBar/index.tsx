import { useState, Fragment } from 'react'

import type { TCommentsState } from '~/spec'

import StateBar from './StateBar'
import PublishBar from './PublishBar'
import PublishEditor from '../Editor/PublishEditor'

import useLogic from '../useLogic'
import { Wrapper } from '../styles/head_bar'

import type { TMode, TAPIMode, TEditState } from '../spec'

export type TProps = {
  mode: TMode
  apiMode: TAPIMode
  isAllFolded: boolean
  loading: boolean
  basicState: TCommentsState
  editState: TEditState
}

export default () => {
  const { mode, apiMode, loading, getFoldState, getEditState, getBasicState } = useLogic()

  const foldState = getFoldState()
  const basicState = getBasicState()
  const editState = getEditState()

  const { isAllFolded } = foldState

  const { commentBody, submitState } = editState
  const [barMode, setBarMode] = useState('normal')

  return (
    <Wrapper>
      {barMode === 'normal' && (
        <StateBar
          apiMode={apiMode}
          isAllFolded={isAllFolded}
          basicState={basicState}
          mode={mode}
          loading={loading}
          callEditor={() => setBarMode('publish')}
        />
      )}

      {barMode === 'publish' && (
        <Fragment>
          <PublishBar closeEditor={() => setBarMode('normal')} />
          <PublishEditor body={commentBody} submitState={submitState} />
        </Fragment>
      )}
    </Wrapper>
  )
}
