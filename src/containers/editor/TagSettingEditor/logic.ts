import { useEffect } from 'react'
// import { } from 'ramda'

import type { TPostLayout, TTag } from '@/spec'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import { buildLog } from '@/utils/logger'
import asyncSuit from '@/utils/async'
import { send, errRescue, closeDrawer } from '@/utils/signal'

import S from './schema'
import type { TStore } from './store'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:TagSettingEditor')

export const deleteArticleTag = (tag: TTag): void => {
  const { id, thread, community } = tag

  sr71$.mutate(S.deleteArticleTag, { id, community: community.raw, thread })
}

export const edit = (layout: TPostLayout): void => {
  //
}

// ###############################
// init & uninit handlers
// ###############################

const _handleDone = (): void => {
  closeDrawer()
  // refresh the tag list
}

const DataSolver = [
  {
    match: asyncRes('deleteArticleTag'),
    action: () => {
      _handleDone()
      send(EVENT.REFRESH_TAGS)
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => {
      errRescue({ type: ERR.GRAPHQL, details, path: 'TagSettingEditor' })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => errRescue({ type: ERR.TIMEOUT, details, path: 'TagSettingEditor' }),
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => errRescue({ type: ERR.NETWORK, path: 'TagSettingEditor' }),
  },
]

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)

    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    // return () => store.reset()
  }, [_store])
}
