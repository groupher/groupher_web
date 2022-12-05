/*
 * ArticleEditor store
 *
 */

import { types as T, Instance, getParent } from 'mobx-state-tree'
import { pick, values } from 'ramda'

import type {
  TRootStore,
  TID,
  TCommunity,
  TArticle,
  TArticleThread,
  TSubmitState,
  TAccount,
  TEditMode,
  TGroupedTags,
  TTag,
} from '@/spec'

import { markStates, toJS } from '@/utils/mobx'
import { Community, Tag, User } from '@/model'

import { ARTICLE_CAT } from '@/constant'

import type { TTexts, TEditData } from './spec'

const ArticleEditor = T.model('ArticleEditor', {
  mode: T.optional(T.enumeration(['publish', 'update']), 'publish'),
  isArchived: T.optional(T.boolean, false),
  archivedAt: T.maybeNull(T.string),

  title: T.optional(T.string, ''),
  author: T.maybeNull(User),
  body: T.optional(T.string, '{}'),
  linkAddr: T.optional(T.string, ''),
  copyRight: T.optional(T.string, 'cc'),
  isQuestion: T.optional(T.boolean, false),
  community: T.optional(Community, {}),
  articleTags: T.optional(T.array(Tag), []),

  // job spec
  company: T.optional(T.string, ''),
  companyLink: T.optional(T.string, ''),

  // showSubTitle: T.optional(T.boolean, false),
  publishing: T.optional(T.boolean, false),
  publishDone: T.optional(T.boolean, false),
  //
  wordsCountReady: T.optional(T.boolean, false),

  // selectors
  activeCat: T.optional(
    T.enumeration(values(ARTICLE_CAT)),
    ARTICLE_CAT.FEATURE,
  ),

  activeTag: T.maybeNull(Tag),
})
  .views((self) => ({
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.account.accountInfo
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.viewingArticle)
    },
    get allowEdit(): boolean {
      const slf = self as TStore
      const { mode, accountInfo } = slf

      if (mode === 'publish') return true

      return accountInfo.login === slf.author?.login
    },
    get thread(): TArticleThread {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.viewingThread)
    },
    get communityData(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get communityId(): TID {
      return self.community.id
    },

    get groupedTags(): TGroupedTags {
      const root = getParent(self) as TRootStore
      return root.tagsBar.groupedTags
    },
    get texts(): TTexts {
      return {
        holder: {
          title: '// 帖子标题',
          body: "// 帖子内容（'Tab' 键插入富文本）",
        },
      }
    },
    get editData(): TEditData {
      const slf = self as TStore

      const tagsIds = toJS(slf.articleTags).map((t) => t.id)
      const baseFields = [
        'title',
        'body',
        'copyRight',
        'isQuestion',
        'linkAddr',
      ]

      return { ...pick(baseFields, slf), articleTags: tagsIds }
    },
    get isReady(): boolean {
      const slf = self as TStore
      const { title, wordsCountReady } = slf
      const titleReady = title.length > 0

      return wordsCountReady && titleReady
    },
    get isArticleAuthor(): boolean {
      const slf = self as TStore
      return slf.allowEdit
    },
    get submitState(): TSubmitState {
      const slf = self as TStore
      const { mode } = slf

      const basicStatus = pick(
        [
          'publishing',
          'publishDone',
          'isReady',
          'isArchived',
          'isArticleAuthor',
        ],
        slf,
      )

      return { ...basicStatus, mode: mode as TEditMode }
    },
    get activeTagData(): TTag | null {
      return toJS(self.activeTag)
    },
  }))
  .actions((self) => ({
    setViewing(article: TArticle): void {
      const root = getParent(self) as TRootStore
      const thread = article.meta.thread.toLowerCase()

      return root.viewing.setViewing({
        viewingThread: thread,
        [thread]: article,
      })
    },
    updateEditing(sobj): void {
      const slf = self as TStore
      slf.mark(sobj)
    },
    loadEditData(article: TArticle): void {
      const {
        title,
        author,
        copyRight,
        linkAddr,
        isQuestion,
        document,
        originalCommunity,
        articleTags,
        // @ts-ignore
        company,
        // @ts-ignore
        companyLink,
        isArchived,
        archivedAt,
      } = article

      self.title = title
      self.copyRight = copyRight
      self.isArchived = isArchived
      self.archivedAt = archivedAt
      // @ts-ignore
      self.author = author

      if (document?.body) self.body = document.body

      // @ts-ignore
      if (originalCommunity) self.community = originalCommunity
      if (linkAddr) self.linkAddr = linkAddr
      if (isQuestion) self.isQuestion = isQuestion
      // @ts-ignore
      if (articleTags) self.articleTags = articleTags

      if (company) self.company = company
      if (companyLink) self.companyLink = companyLink
    },
    reset(): void {
      self.mode = 'publish'
      self.title = ''
      self.body = '{}'
      self.linkAddr = ''
      self.copyRight = 'cc'
      self.isQuestion = false

      self.publishing = false
      self.publishDone = false
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ArticleEditor>
export default ArticleEditor
