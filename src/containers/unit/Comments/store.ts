/*
 * CommentsStore store
 *
 */

import { values, map, findIndex, propEq, toUpper, pick, uniqBy, prop } from 'ramda'

import type {
  TRootStore,
  TCommunity,
  TUser,
  TArticle,
  TThread,
  TRoute,
  TID,
  TPagedComments,
  TComment,
  TEmotion,
  TSubmitState,
  TCommentsState,
} from '~/spec'
// import TYPE from '~/const/type'
import { T, getParent, markStates, type Instance, toJS, useMobxContext } from '~/mobx'
import { Comment, PagedComments, emptyPagi, SimpleUser } from '~/model'

import type { TFoldState, TEditMode, TEditState, TRepliesState } from './spec'
import { MODE, EDIT_MODE, API_MODE } from './constant'

const mentionMapper = (m) => ({ id: m.id, avatar: m.avatar, name: m.nickname })

const CommentsStore = T.model('CommentsStore', {
  mode: T.opt(T.enum(values(MODE)), MODE.REPLIES),
  apiMode: T.opt(T.enum(values(API_MODE)), API_MODE.ARTICLE),
  editMode: T.opt(T.enum(values(EDIT_MODE)), EDIT_MODE.CREATE),

  // toggle main comment box
  showEditor: T.opt(T.bool, false),
  showUpdateEditor: T.opt(T.bool, false),

  // toggle modal editor for reply
  showReplyEditor: T.opt(T.bool, false),

  // content input of current comment editor
  commentBody: T.opt(T.string, '{}'),
  // update comment
  updateId: T.maybeNull(T.string),
  updateBody: T.opt(T.string, '{}'),
  // reply comment
  // parrent comment of current reply
  replyToComment: T.maybeNull(Comment),
  replyBody: T.opt(T.string, '{}'),
  // content input of current reply comment editor
  wordsCountReady: T.opt(T.bool, false),
  // comments pagination data of current COMMUNITY / PART
  pagedComments: T.opt(PagedComments, emptyPagi),
  pagedPublishedComments: T.opt(PagedComments, emptyPagi),

  // loadPagedReplies
  repliesParentId: T.maybeNull(T.string),
  repliesLoading: T.opt(T.bool, false),

  // toggle loading for creating comment
  publishing: T.opt(T.bool, false),
  publishDone: T.opt(T.bool, false),
  // toggle loading for comments list
  loading: T.opt(T.bool, false),

  foldedCommentIds: T.opt(T.array(T.string), []),

  // basic states
  needRefreshState: T.opt(T.bool, true),
  isViewerJoined: T.opt(T.bool, false),
  participantsCount: T.opt(T.number, 0),
  totalCount: T.opt(T.number, -1),
  participants: T.opt(T.array(SimpleUser), []),
})
  .views((self) => ({
    get basicState(): TCommentsState {
      const slf = self as TStore
      let totalCount = 0
      if (slf.apiMode === API_MODE.ARTICLE) {
        totalCount = self.totalCount === -1 ? slf.viewingArticle.commentsCount : self.totalCount
      } else {
        // eslint-disable-next-line prefer-destructuring
        totalCount = slf.pagedPublishedComments.totalCount
      }

      return {
        isViewerJoined: self.isViewerJoined,
        participantsCount: self.participantsCount,
        totalCount,
        participants: toJS(self.participants),
      }
    },
    get curRoute(): TRoute {
      const root = getParent(self) as TRootStore
      return root.curRoute
    },
    get isAllFolded(): boolean {
      const slf = self as TStore
      const { foldedIds, pagedCommentsData } = slf
      if (pagedCommentsData.totalCount === 0) return false
      return foldedIds.length === pagedCommentsData.totalCount
    },
    get foldedIds(): TID[] {
      return toJS(self.foldedCommentIds)
    },
    get foldState(): TFoldState {
      const slf = self as TStore

      return {
        foldedIds: toJS(slf.foldedCommentIds),
        isAllFolded: slf.isAllFolded,
      }
    },
    get editState(): TEditState {
      const slf = self as TStore
      const baseFields = pick(
        [
          'commentBody',
          'updateBody',
          'replyBody',
          'showEditor',
          'showReplyEditor',
          'showUpdateEditor',
          'submitState',
          'updateId',
        ],
        slf,
      )

      return { ...baseFields, replyToComment: slf.replyToCommentData }
    },
    get repliesState(): TRepliesState {
      const slf = self as TStore
      return pick(['repliesParentId', 'repliesLoading'], slf)
    },
    get participators(): TUser[] {
      const root = getParent(self) as TRootStore
      const { commentsParticipants } = root.viewing.viewingArticle
      /*
      const commentsParticipants = [
        {
          id: '112',
          nickname: 'mydearxym',
          avatar: 'https://avatars2.githubusercontent.com/u/6184465?v=4',
        },
        {
          id: '113',
          nickname: 'Julian',
          avatar:
            'http://groupher.oss-cn-beijing.aliyuncs.com/mock/avatar4.png',
        },
      ]
      */

      return map(mentionMapper, commentsParticipants)
    },
    get pagedCommentsData(): TPagedComments {
      if (self.apiMode === API_MODE.USER_PUBLISHED) {
        return toJS(self.pagedPublishedComments)
      }
      return toJS(self.pagedComments)
    },
    get viewingUser(): TUser {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.user)
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get communitySlug(): string {
      const root = getParent(self) as TRootStore
      // const viewingCommunity = toJS(self.root.viewing.community)
      // if (viewingCommunity.slug) return viewingCommunity.slug

      return root.viewing.viewingArticle.originalCommunity.slug
    },
    get activeThread(): Uppercase<TThread> {
      const root = getParent(self) as TRootStore
      const { activeThread, viewingThread } = root.viewing
      return toUpper(viewingThread || activeThread)
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return root.viewing.viewingArticle
    },
    get replyToCommentData(): TComment | null {
      return toJS(self.replyToComment)
    },
    get isReady(): boolean {
      const slf = self as TStore
      const { wordsCountReady } = slf

      return wordsCountReady
    },
    get submitState(): TSubmitState {
      const slf = self as TStore
      return pick(['publishing', 'publishDone', 'isReady'], slf)
    },
  }))
  .actions((self) => ({
    updateEditing(sobj): void {
      const slf = self as TStore
      slf.mark(sobj)
    },

    updateMentionList(mentionArray): void {
      // const curMentionList = clone(self.mentionList)
      // const uniqList = concat(curMentionList, mentionArray)
      // const mentionList = map(mentionMapper, uniqList)
      // @ts-ignore
      // self.mentionList = uniq(concat(mentionList, self.participators))
    },
    updateOneComment(comment: TComment, fields = {}): void {
      const { id, replyToId } = comment
      const { entries } = self.pagedCommentsData

      if (self.mode === MODE.REPLIES && replyToId) {
        const parentIndex = findIndex(propEq(replyToId, 'id'), entries)
        if (parentIndex < 0) return
        const parentComment = entries[parentIndex]
        const replyIndex = findIndex(propEq(id, 'id'), parentComment.replies)
        if (replyIndex < 0) return
        const replyComment = parentComment.replies[replyIndex]
        // @ts-ignore
        if (fields.meta) fields.meta = { ...replyComment.meta, ...fields.meta }
        // @ts-ignore
        self.pagedComments.entries[parentIndex].replies[replyIndex] = {
          ...replyComment,
          ...fields,
        }
      } else {
        // timeline & replies parent comment
        const index = findIndex(propEq(id, 'id'), entries)

        if (index < 0) return
        const comment = entries[index]
        // @ts-ignore
        if (fields.meta) fields.meta = { ...comment.meta, ...fields.meta }

        // @ts-ignore
        self.pagedComments.entries[index] = { ...comment, ...fields }
      }
    },

    upvoteEmotion(comment: TComment, emotion: TEmotion): void {
      const { id, replyToId } = comment
      const slf = self as TStore
      const { entries } = slf.pagedCommentsData

      if (self.mode === MODE.REPLIES && replyToId) {
        const parentIndex = findIndex(propEq(replyToId, 'id'), entries)
        if (parentIndex < 0) return
        const parentComment = entries[parentIndex]
        const replyIndex = findIndex(propEq(id, 'id'), parentComment.replies)
        if (replyIndex < 0) return
        const replyComment = parentComment.replies[replyIndex]
        self.pagedComments.entries[parentIndex].replies[replyIndex].emotions = {
          ...replyComment.emotions,
          ...emotion,
        }
      } else {
        const index = findIndex(propEq(id, 'id'), entries)
        if (index < 0) return
        // @ts-ignore
        self.pagedComments.entries[index].emotions = {
          ...entries[index].emotions,
          ...emotion,
        }
      }
    },
    addToReplies(replies: TComment[]): void {
      const slf = self as TStore
      const { repliesParentId } = slf
      const { entries } = slf.pagedCommentsData

      if (self.mode === MODE.REPLIES && repliesParentId) {
        const parentIndex = findIndex(propEq(repliesParentId, 'id'), entries)

        if (parentIndex < 0) return
        const curReplies = entries[parentIndex].replies
        const uniqReplies = uniqBy(prop('id'), curReplies.concat(replies))

        // @ts-ignore
        self.pagedComments.entries[parentIndex].replies = uniqReplies
      }
    },
    published(): void {
      self.publishing = false
      self.publishDone = true
    },
    resetPublish(mode: TEditMode): void {
      switch (mode) {
        case EDIT_MODE.REPLY: {
          self.showReplyEditor = false
          self.replyBody = '{}'
          self.replyToComment = null
          self.publishDone = false
          return
        }
        case EDIT_MODE.UPDATE: {
          self.showUpdateEditor = false
          self.updateId = null
          self.updateBody = '{}'
          self.publishDone = false
          return
        }
        default: {
          self.showEditor = false
          self.commentBody = '{}'
          self.publishDone = false
        }
      }
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof CommentsStore>
export const useStore = (): TStore => useMobxContext().store.comments

export default CommentsStore
