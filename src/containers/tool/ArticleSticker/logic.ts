import { useEffect } from 'react'

import { authWarn, addCollection } from '@/signal'
import { buildLog } from '@/logger'
import asyncSuit from '@/async'

import type { TStore } from './store'

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:ArticleSticker')

export const handleUpvote = (viewerHasUpvoted: boolean): void => {
  //
}

export const handleCollect = (): void => {
  if (!store.isLogin) return authWarn({ hideToast: true })
  addCollection()
}

const DataSolver = [
  {
    match: asyncRes('pagedCommentsParticipants'),
    action: ({ pagedCommentsParticipants }) => {
      store.mark({ pagedCommentsParticipants })
    },
  },
]
const ErrSolver = []

// ###############################
// init & uninit handlers
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    log('useInit: ', store)
    // return () => store.reset()
    return () => {
      sr71$.stop()
      sub$.unsubscribe()
      sub$ = null
    }
  }, [_store])
}
