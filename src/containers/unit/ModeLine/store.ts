/*
 * ModeLine store
 *
 */

import { values } from 'ramda'

import type { TRootStore, TViewing, TArticle } from '~/spec'

import TYPE from '~/const/type'
// import METRIC from '~/const/metric'

import { T, getParent, markStates, type Instance, toJS, useMobxContext } from '~/mobx'

const ModeLine = T.model('ModeLine', {
  topBarVisiable: T.opt(T.bool, false),
  activeMenu: T.opt(T.enum([...values(TYPE.MM_TYPE), '']), ''),
})
  .views((self) => ({
    get isMobile(): boolean {
      const root = getParent(self) as TRootStore
      return root.isMobile
    },

    get viewing(): TViewing {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing)
    },
    get isArticleBarVisiable(): boolean {
      // const root = getParent(self) as TRootStore

      // TODO:
      return true
    },
    get isTopBarVisiable(): boolean {
      // const slf = self as TStore
      // const root = getParent(self) as TRootStore

      // const { isMobile, topBarVisiable, isArticleDigestInViewport } = slf
      // const { bodyScrollDirection } = globalLayout

      // if (metric === METRIC.COMMUNITY && bodyScrollDirection === 'down') {
      //   return topBarVisiable
      // }
      // // do not show article topBar on desktop
      // if (!isMobile && metric === METRIC.ARTICLE) return false

      // if (isArticleDigestInViewport) return false

      // if (bodyScrollDirection === 'up') {
      //   return false
      // }

      return false
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
      // const root = getParent(self) as TRootStore
      // return root.articleDigest.inViewport
      // TODO:
      return true
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
// @ts-ignore
export const useStore = (): TStore => useMobxContext().store.modeLine

export default ModeLine
