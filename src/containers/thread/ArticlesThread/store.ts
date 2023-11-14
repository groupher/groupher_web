/*
 * ArticlesThread store
 */

import { isEmpty, findIndex, propEq, pickBy, values, includes, mergeRight } from 'ramda'

import type {
  TRootStore,
  TID,
  TTag,
  TAccount,
  TArticle,
  TPagedArticles,
  TCommunity,
  TThread,
  TArticleFilter,
  TGlobalLayout,
  TGroupedTags,
} from '@/spec'

import { T, markStates, getParent, Instance, toJS, useMobxContext } from '@/mobx'
import TYPE from '@/constant/type'
import { ARTICLE_THREAD } from '@/constant/thread'

import { nilOrEmpty } from '@/validator'
import { plural } from '@/fmt'

import { PagedPosts, PagedChangelogs, ArticlesFilter, emptyPagi } from '@/model'

const ArticlesThread = T.model('ArticlesThread', {
  mode: T.opt(T.enum(['default', 'modeline']), 'default'),
  pagedPosts: T.opt(PagedPosts, emptyPagi),
  pagedChangelogs: T.opt(PagedChangelogs, emptyPagi),
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

      if (!includes(slf.curThread, values(ARTICLE_THREAD))) {
        return emptyPagi
      }

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
      return { tag: curTag.slug }
    },
    get showFilters(): boolean {
      const slf = self as TStore
      if (!includes(slf.curThread, values(ARTICLE_THREAD))) return false

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
      // TODO: need update kanban source logic
      if (slf.curThread !== ARTICLE_THREAD.POST) return null

      const { entries } = slf.pagedArticlesData
      // @ts-ignore
      const index = findIndex(propEq(id, 'id'), entries)
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
      self.filters = mergeRight(curfilter, option)
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

      slf[pagedArticleKey].entries[index] = mergeRight(targetArticle, fields)
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
export const useStore = (): TStore => useMobxContext().store.articlesThread
export default ArticlesThread
