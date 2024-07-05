import { proxy } from 'valtio'

import type { TResState } from '~/spec'
import { EMPTY_PAGI } from '~/const/utils'
import TYPE from '~/const/type'

import type { TStore } from './spec'

export default (): TStore => {
  const store = proxy({
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
  })

  return store
}
