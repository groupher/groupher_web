/*
 * ArticlesThread store
 */

import { isEmpty, findIndex, propEq, pickBy, values, includes, mergeRight, has } from 'ramda'

import type {
  TRootStore,
  TID,
  TArticle,
  TPagedArticles,
  TCommunity,
  TThread,
  TGlobalLayout,
  TResState,
  TArticleFilter,
} from '@/spec'

import { T, markStates, getParent, Instance, toJS } from '@/mobx'
import TYPE from '@/constant/type'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import { ARTICLE_THREAD } from '@/constant/thread'

import { plural } from '@/fmt'

import { PagedPosts, PagedChangelogs, ArticlesFilter, emptyPagi } from '@/model'

const ArticlesStore = T.model('Articles', {
  pagedPosts: T.opt(PagedPosts, emptyPagi),
  pagedChangelogs: T.opt(PagedChangelogs, emptyPagi),

  // kanban's
  todo: T.opt(PagedPosts, emptyPagi),
  wip: T.opt(PagedPosts, emptyPagi),
  done: T.opt(PagedPosts, emptyPagi),

  activeCat: T.maybeNull(T.enum(values(ARTICLE_CAT))),
  activeState: T.maybeNull(T.enum(values(ARTICLE_STATE))),

  filters: T.opt(ArticlesFilter, {}),
  resState: T.opt(T.enum('resState', values(TYPE.RES_STATE)), TYPE.RES_STATE.EMPTY),
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
    get pagedPostsData(): TPagedArticles {
      return toJS(self.pagedPosts)
    },
    get showFilters(): boolean {
      const slf = self as TStore
      if (!includes(slf.curThread, values(ARTICLE_THREAD))) return false

      const curFilter = toJS(pickBy((v) => !isEmpty(v), self.filters))
      const pagedPosts = toJS(slf.pagedPosts)

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
      const { totalCount } = slf.pagedPosts

      console.log('## instore resState: ', self.resState)

      if (totalCount === 0) {
        self.resState = TYPE.RES_STATE.EMPTY
      } else {
        self.resState = TYPE.RES_STATE.DONE
      }
    },
    updateActiveFilter(filter: TArticleFilter): void {
      if (has('cat', filter)) self.activeCat = filter.cat
      if (has('state', filter)) self.activeState = filter.state
    },
    targetArticleIndex(id: TID): number | null {
      const slf = self as TStore
      // TODO: need update kanban source logic
      if (slf.curThread !== ARTICLE_THREAD.POST) return null

      const { entries } = slf.pagedPosts
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
    updatePagedArticles(pagedArticles: TPagedArticles): void {
      const slf = self as TStore
      const { pagedArticleKey } = slf

      slf[pagedArticleKey] = pagedArticles
    },
    updateResState(state: TResState): void {
      const slf = self as TStore
      slf.resState = state
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ArticlesStore>
export default ArticlesStore
