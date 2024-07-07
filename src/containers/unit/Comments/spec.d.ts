import type { TAccount, TComment, TID, TSubmitState, TPagedComments, TUser } from '~/spec'

export type TStore = {
  mode: TMode
  apiMode: TAPIMode
  editMode: TEditMode

  // toggle main comment box
  showEditor: boolean
  showUpdateEditor: boolean

  // toggle modal editor for reply
  showReplyEditor: boolean

  // content input of current comment editor
  commentBody: string
  // update comment
  updateId: string | null
  updateBody: string
  // reply comment
  // parrent comment of current reply
  replyToComment: TComment | null
  replyBody: string
  // content input of current reply comment editor
  wordsCountReady: boolean
  // comments pagination data of current COMMUNITY / PART
  pagedComments: TPagedComments
  pagedPublishedComments: TPagedComments

  // loadPagedReplies
  repliesParentId: string | null
  repliesLoading: boolean

  // toggle loading for creating comment
  publishing: boolean
  publishDone: boolean
  // toggle loading for comments list
  loading: boolean

  foldedCommentIds: stirng[]

  // basic states
  needRefreshState: true
  isViewerJoined: false
  participantsCount: 0
  totalCount: -1
  participants: TUser[]

  commit: (patch: Partial<TStore>) => void
}

export type TMode = 'REPLIES' | 'TIMELINE'
export type TAPIMode = 'article' | 'user_published'
export type TEditMode = 'CREATE' | 'UPDATE' | 'REPLY'

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
  updateId: TID | null
  replyToComment: TComment | null
}

export type TRepliesState = {
  repliesParentId: TID | null
  repliesLoading: boolean
}
