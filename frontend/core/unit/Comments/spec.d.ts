import type { TComment, TID, TSubmitState } from '~/spec'

import type { EDIT_MODE, MODE } from './constant'

export type TMode = `${MODE}`
export type TAPIMode = 'article' | 'user_published'
export type TEditMode = `${EDIT_MODE}`

export type TFoldState = {
  isAllFolded: boolean
  foldedIds: TID[]
}

export type TEditState = {
  commentBody: string
  updateBody: string
  replyBody: string
  showEditor: boolean
  showReplyEditor: boolean
  showUpdateEditor: boolean
  submitState: TSubmitState
  updateInnerId: TID | null
  replyToComment: TComment | null
}
