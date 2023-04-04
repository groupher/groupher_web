/*
 * ArticlesThread store
 */

import { merge, isEmpty, findIndex, propEq, pickBy, values } from 'ramda'

import type {
  TRootStore,
  TID,
  TTag,
  TAccount,
  TArticle,
  TArticleMeta,
  TPagedArticles,
  TCommunity,
  TThread,
  TArticleFilter,
  TC11N,
  TGlobalLayout,
  TAvatarLayout,
  TGroupedTags,
} from '@/spec'

import TYPE from '@/constant/type'
import { T, markStates, getParent, Instance, toJS } from '@/utils/mobx'
import { nilOrEmpty } from '@/utils/validator'
import { plural } from '@/utils/fmt'

import { PagedPosts, ArticlesFilter, emptyPagi } from '@/model'

const ArticlesThread = T.model('ArticlesThread', {
  mode: T.opt(T.enum(['default', 'search']), 'default'),
  searchValue: T.opt(T.string, ''),
  pagedPosts: T.opt(PagedPosts, emptyPagi),
  filters: T.opt(ArticlesFilter, {}),
  resState: T.opt(T.enum('resState', values(TYPE.RES_STATE)), TYPE.RES_STATE.LOADING),
})
  .views((self) => ({
    get isMobile(): boolean {
      const root = getParent(self) as TRootStore

      return root.isMobile
    },
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get curThread(): TThread {
      const root = getParent(self) as TRootStore
      return root.viewing.activeThread
    },
    get isEmpty(): boolean {
      const slf = self as TStore
      const thread = slf.curThread

      return slf[`paged${plural(thread, 'titleCase')}`].totalCount === 0
    },
    get pagedArticlesData(): TPagedArticles {
      const slf = self as TStore
      const pagedThreadKey = `paged${plural(slf.curThread, 'titleCase')}`

      return toJS(slf[pagedThreadKey])
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return root.viewing.viewingArticle
    },
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.account.accountInfo
    },
    get c11n(): TC11N {
      const root = getParent(self) as TRootStore
      return root.account.c11n
    },
    get filtersData(): TArticleFilter {
      return toJS(pickBy((v) => !isEmpty(v), self.filters))
    },
    get activeTagData(): TTag {
      const root = getParent(self) as TRootStore
      return toJS(root.tagsBar.activeTagData)
    },
    get groupedTags(): TGroupedTags {
      const root = getParent(self) as TRootStore
      return root.tagsBar.groupedTags
    },
    get tagQuery(): Record<string, unknown> {
      const root = getParent(self) as TRootStore

      const curTag = toJS(root.tagsBar.activeTag)
      if (nilOrEmpty(curTag)) return {}
      return { tag: curTag.raw }
    },
    get showFilters(): boolean {
      const slf = self as TStore
      const curFilter = toJS(pickBy((v) => !isEmpty(v), self.filters))
      const pagedPosts = toJS(slf.pagedArticlesData)

      return !isEmpty(curFilter) || !isEmpty(pagedPosts.entries)
    },
    get pagedArticleKey(): string {
      const slf = self as TStore
      return `paged${plural(slf.curThread, 'titleCase')}`
    },
    get globalLayout(): TGlobalLayout {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.globalLayout
    },
    get isViewingArticle(): boolean {
      const root = getParent(self) as TRootStore

      return root.drawer.open && !!root.viewing.viewingArticle?.id
    },
    get avatarLayout(): TAvatarLayout {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.avatarLayout
    },
  }))
  .actions((self) => ({
    afterInitLoading(): void {
      const slf = self as TStore
      const { totalCount } = slf.pagedArticlesData

      if (totalCount === 0) {
        self.resState = TYPE.RES_STATE.EMPTY
      } else {
        self.resState = TYPE.RES_STATE.DONE
      }
    },
    // the args pass to server when load articles
    getLoadArgs(page = 1): Record<string, unknown> {
      self.resState = TYPE.RES_STATE.LOADING

      const root = getParent(self) as TRootStore
      return root.getPagedArticleArgs(page, self.filtersData)
    },
    markRes(res: Record<string, TPagedArticles>): void {
      const slf = self as TStore
      const pagedData = values(res)[0] as TPagedArticles

      if (pagedData.totalCount === 0) {
        slf.resState = TYPE.RES_STATE.EMPTY
      } else {
        slf.resState = TYPE.RES_STATE.DONE
      }

      slf.mark(res)
    },
    targetArticleIndex(id: TID): number | null {
      const slf = self as TStore
      const { entries } = slf.pagedArticlesData
      // @ts-ignore
      const index = findIndex(propEq('id', id), entries)
      if (index < 0) return null

      return index
    },
    targetArticle(id: TID): TArticle | null {
      const slf = self as TStore
      const { pagedArticleKey } = slf
      const index = slf.targetArticleIndex(id)
      if (index < 0) return null

      return toJS(slf[pagedArticleKey].entries[index])
    },
    selectFilter(option: TArticleFilter): void {
      const curfilter = self.filtersData
      // @ts-ignore
      self.filters = merge(curfilter, option)
    },
    showTopModeline(fix): void {
      const root = getParent(self) as TRootStore
      root.showTopModeline(fix)
    },
    setViewing(sobj): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    updateArticle(fields: TArticle): void {
      const slf = self as TStore
      const { pagedArticleKey } = slf
      const index = slf.targetArticleIndex(fields.id)
      if (index === null) return
      const targetArticle = toJS(slf[pagedArticleKey].entries[index])

      slf[pagedArticleKey].entries[index] = merge(targetArticle, fields)
    },
    updateUpvote(id: TID, viewerHasUpvoted: boolean): void {
      const slf = self as TStore
      const { pagedArticleKey } = slf

      const index = slf.targetArticleIndex(id)
      if (index === null) return
      const targetArticle = toJS(slf[pagedArticleKey].entries[index])

      let curCount = targetArticle.upvotesCount
      curCount = viewerHasUpvoted ? (curCount += 1) : (curCount -= 1)

      self[pagedArticleKey].entries[index].upvotesCount = curCount
      self[pagedArticleKey].entries[index].viewerHasUpvoted = viewerHasUpvoted
    },
    updateUpvoteCount(id: TID, count: number, meta: TArticleMeta): void {
      const slf = self as TStore
      const { pagedArticleKey } = slf

      const index = slf.targetArticleIndex(id)
      if (index === null) return

      if (meta) {
        slf[pagedArticleKey].entries[index].meta.latestUpvotedUsers = meta.latestUpvotedUsers
      }

      slf[pagedArticleKey].entries[index].upvotesCount = count
    },
    markRoute(params): void {
      const query = { ...self.tagQuery, ...self.filtersData, ...params }

      const root = getParent(self) as TRootStore
      root.markRoute(query, { onlyDesktop: true })
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ArticlesThread>
export default ArticlesThread
