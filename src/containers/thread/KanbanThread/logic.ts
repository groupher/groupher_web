import { useEffect } from 'react'
// import { } from 'ramda'

import ERR from '@/constant/err'

import { buildLog } from '@/logger'
import asyncSuit from '@/utils/async'
import { errRescue } from '@/signal'

import S from './schema'
import type { TStore } from './store'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit

let store: TStore | undefined
let sub$ = null

const sr71$ = new SR71()

/* eslint-disable-next-line */
const log = buildLog('L:KanbanThread')

export const loadKanbanPosts = (): void => {
  sr71$.query(S.groupedKanbanPosts, { community: 'home' })
}

// ###############################
// init & uninit handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('groupedKanbanPosts'),
    action: (data) => {
      const {
        groupedKanbanPosts: { todo, wip, done },
      } = data
      store.mark({ todo, wip, done })
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: () => {
      //
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      errRescue({ type: ERR.TIMEOUT, details, path: 'PostsThread' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      errRescue({ type: ERR.NETWORK, path: 'PostsThread' })
    },
  },
]

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)

    // loadKanbanPosts()
    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    }

    // return () => store.reset()
  }, [_store])
}
