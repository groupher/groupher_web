import { proxy } from 'valtio'
import { mergeLeft, mergeDeepRight, has } from 'ramda'

import type { TResState, TArticleFilter } from '~/spec'
import { EMPTY_PAGI } from '~/const/utils'
import TYPE from '~/const/type'
import URL_PARAM from '~/const/url_param'

import type { TStore, TInit } from './spec'

export default (init: TInit = {}): TStore => {
  const store = proxy(
    mergeLeft(init, {
      pagedPosts: EMPTY_PAGI,
      pagedChangelogs: EMPTY_PAGI,

      // kanban's
      todo: EMPTY_PAGI,
      wip: EMPTY_PAGI,
      done: EMPTY_PAGI,

      activeOrder: null,
      activeCat: null,
      activeState: null,

      resState: TYPE.RES_STATE.EMPTY as TResState,

      updateActiveFilter(filter: TArticleFilter): void {
        if (has(URL_PARAM.CAT, filter)) store.activeCat = filter.cat
        if (has(URL_PARAM.STATE, filter)) store.activeState = filter.state
        if (has(URL_PARAM.ORDER, filter)) store.activeOrder = filter.order
      },

      commit: (patch: Partial<TStore>): void => {
        Object.assign(store, mergeDeepRight(store, patch))
      },
    }),
  )

  return store
}
