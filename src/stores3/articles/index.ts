import { proxy } from 'valtio'
import { mergeLeft, mergeDeepRight } from 'ramda'

import type { TResState } from '~/spec'
import { EMPTY_PAGI } from '~/const/utils'
import TYPE from '~/const/type'

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

      // actions
      commit: (patch: Partial<TStore>): void => {
        Object.assign(store, mergeDeepRight(store, patch))
      },
    }),
  )

  return store
}
