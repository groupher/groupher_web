import { useEffect } from 'react'
// import { } from 'ramda'

import { buildLog } from '@/logger'
import EVENT from '@/constant/event'
import asyncSuit from '@/async'

// import S from './schma'
import type { TStore } from './store'

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71({
  /* @ts-ignore */
  receive: EVENT.AUTH,
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:Subscriber')

export const onClose = (): void => {
  store.toggleVisible(false)
}

const DataResolver = [
  {
    match: asyncRes(EVENT.AUTH),
    action: () => store.toggleVisible(),
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
