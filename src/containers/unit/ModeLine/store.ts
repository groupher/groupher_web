/*
 * ModeLine store
 *
 */

import { values } from 'ramda'

import type {
  TRootStore,
  TViewing,
  TCommunity,
  TArticle,
  TArticleFilter,
  TThread,
  TGroupedTags,
  TTag,
} from '@/spec'

import METRIC from '@/constant/metric'
import TYPE from '@/constant/type'

import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'

const ModeLine = T.model('ModeLine', {
  topBarVisiable: T.opt(T.bool, false),
  activeMenu: T.opt(T.enum([...values(TYPE.MM_TYPE), '']), ''),
  metric: T.opt(T.enum(values(METRIC)), METRIC.COMMUNITY),
})
  .views((self) => ({
    get isMobile(): boolean {
      const root = getParent(self) as TRootStore
      return root.isMobile
    },
    get activeTag(): TTag {
      const root = getParent(self) as TRootStore
      return toJS(root.tagsBar.activeTagData)
    },
    get groupedTags(): TGroupedTags {
      const root = getParent(self) as TRootStore
      return root.tagsBar.groupedTags
    },

    get filtersData(): TArticleFilter {
      const root = getParent(self) as TRootStore

      return root.articlesThread.filtersData
    },

    get viewing(): TViewing {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing)
    },
    get isArticleBarVisiable(): boolean {
      const root = getParent(self) as TRootStore

      return !root.articleDigest.inViewport
    },
    get isTopBarVisiable(): boolean {
      const slf = self as TStore

      const { isMobile, topBarVisiable, metric, isArticleDigestInViewport } = slf
      const root = getParent(self) as TRootStore
      const { bodyScrollDirection } = root.globalLayout

      if (metric === METRIC.COMMUNITY && bodyScrollDirection === 'down') {
        return topBarVisiable
      }
      // do not show article topBar on desktop
      if (!isMobile && metric === METRIC.ARTICLE) return false

      if (isArticleDigestInViewport) return false

      if (bodyScrollDirection === 'up') {
        return false
      }

      return true
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return toJS(root.viewingArticle)
    },
    get leftOffset(): number | string {
      return '180px'
    },
    get isMenuActive(): boolean {
      return self.activeMenu !== ''
    },
    get isArticleDigestInViewport(): boolean {
      const root = getParent(self) as TRootStore
      return root.articleDigest.inViewport
    },
    get isCommunityBlockExpand(): boolean {
      const slf = self as TStore

      const { isArticleDigestInViewport } = slf

      if (!isArticleDigestInViewport) return false

      return true
    },
  }))
  .actions((self) => ({
    showTopBar(bool): void {
      self.topBarVisiable = bool
    },
    setViewing(sobj): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    markRoute(query): void {
      const root = getParent(self) as TRootStore
      root.markRoute(query, {})
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ModeLine>

export default ModeLine
