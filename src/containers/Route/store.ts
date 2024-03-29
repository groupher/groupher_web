/*
 * RouteStore store
 *
 */

import { mergeRight, pickBy, omit, isEmpty } from 'ramda'

import type { TRootStore, TRoute } from '@/spec'
import { PAGE_SIZE } from '@/config'

import { T, getParent, Instance, markStates, useMobxContext } from '@/mobx'
import { Global } from '@/helper'
import { serializeQuery } from '@/utils/route'

const Query = T.model('Query', {
  page: T.opt(T.string, '1'),
  size: T.opt(T.string, String(PAGE_SIZE.D)),
  tab: T.maybeNull(T.string),
  // sort .... [when, ...]
  // view ... [chart, list ...]
})

const RouteStore = T.model('RouteStore', {
  communityPath: T.opt(T.string, ''),
  threadPath: T.opt(T.string, ''),
  mainPath: T.opt(T.string, ''),
  subPath: T.opt(T.string, ''),
  query: T.opt(Query, {}),
})
  .views((self) => ({
    get curRoute(): TRoute {
      const { communityPath, threadPath, mainPath, subPath } = self
      return { communityPath, threadPath, mainPath, subPath }
    },
    get isNotDesktop(): boolean {
      const root = getParent(self) as TRootStore
      const { isMobile } = root

      return isMobile
    },
  }))
  .actions((self) => ({
    /**
     * sync query to current url
     * - if current url is subdomain, then we should
     * - reload to that page directly
     * @param {*} query
     * @param {boolean} [opt={ onlyDesktop: false }] if onlyDescktop set to true
     *        then just leave it, otherwise it will mislead the history back btn in mobile
     *        在手机上会导致触发两次才返回
     *
     * @returns {boolean}
     */
    markRoute(query, opt = {}) {
      const defaultOpt = { onlyDesktop: false }
      const option = mergeRight(defaultOpt, opt)

      if (option.onlyDesktop && self.isNotDesktop) {
        return false
      }

      const { mainPath, subPath, page } = query
      let cleanQuery = pickBy((v) => !isEmpty(v), query)

      if (mainPath || mainPath === '') self.mainPath = mainPath
      if (subPath || subPath === '') self.subPath = subPath

      if (page && String(page) === '1') cleanQuery = omit(['page'], query)

      // const allQueryString = serializeQuery(query)
      const queryString = serializeQuery(omit(['mainPath', 'subPath'], query))

      let asPath
      if (self.mainPath && self.subPath) {
        asPath = `/${self.mainPath}/${self.subPath}${queryString}`
      } else if (self.mainPath && subPath === '') {
        asPath = `/${self.mainPath}${queryString}`
      } else if (self.mainPath === '' && subPath === '') {
        asPath = '/'
      } else if (self.mainPath && !subPath) {
        asPath = `/${self.mainPath}`
      } else {
        asPath = `${queryString}`
      }

      // 为空不会改变路由
      if (asPath === '') asPath = '/'

      // NOTE: shallow option only works for same page url
      // if page is diffrent, it will cause page reload
      /* console.log('push url: ', url) */
      // Router.push(url, asPath, { shallow: true })
      // see: https://stackoverflow.com/questions/824349/modify-the-url-without-reloading-the-page
      /* return Global.history.pushState({}, null, url) */
      // NOTE:  Router.push(url, asPath, { shallow: true }) is not working on pruction env
      return Global.history.pushState({}, null, asPath)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof RouteStore>
export const useStore = (): TStore => useMobxContext().store.route

export default RouteStore
