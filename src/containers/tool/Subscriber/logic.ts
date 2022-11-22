import { useEffect } from 'react'
// import { } from 'ramda'

import { buildLog } from '@/utils/logger'
import { EVENT } from '@/constant'
import asyncSuit from '@/utils/async'

// import S from './schma'
import type { TBy } from './spec'
import type { TStore } from './store'

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71({
  /* @ts-ignore */
  receive: EVENT.SUBSCRIBE,
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:Subscriber')

export const changeBy = (by: TBy): void => {
  store.mark({ by })
}

export const onClose = (): void => {
  store.toggleSubscriber(false)
}

const DataResolver = [
  {
    match: asyncRes(EVENT.SUBSCRIBE),
    action: () => store.toggleSubscriber(),
  },
]

// ###############################
// init & uninit handlers
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)
    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataResolver, []))
    }
    // return () => store.reset()
  }, [_store])
}
