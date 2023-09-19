import { useEffect } from 'react'
// import { } from 'ramda'

import type { TArticleCat, TID } from '@/spec'
import { ARTICLE_THREAD } from '@/constant/thread'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'
import TYPE from '@/constant/type'

import asyncSuit from '@/utils/async'
import { errRescue, listUsers, callGEditor, callSyncSelector } from '@/utils/signal'
import { buildLog } from '@/logger'

import type { TStore } from './store'
import S from './schema'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
// @ts-ignore
const sr71$ = new SR71({ receive: [EVENT.COMMUNITY_CHANGE] })

let sub$ = null
let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:ThreadSidebar')

export const onPublish = (cat: TArticleCat) => {
  callGEditor()
  setTimeout(() => callSyncSelector({ cat, tag: store.activeTag }), 500)
}

export const subscribeCommunity = (communityId: TID): void => {
  sr71$.mutate(S.subscribeCommunity, { communityId })
}

export const unsubscribeCommunity = (communityId: TID): void => {
  sr71$.mutate(S.unsubscribeCommunity, { communityId })
}

// 查看当前社区志愿者列表
export const onShowEditorList = (): void => {
  listUsers(TYPE.USER_LISTER_COMMUNITY_EDITORS)
}

export const onShowSubscriberList = (): void => {
  listUsers(TYPE.USER_LISTER_COMMUNITY_SUBSCRIBERS)
}

const loadCommunity = (): void => {
  const userHasLogin = store.isLogin
  const { slug } = store.curCommunity

  markLoading(true)

  sr71$.query(S.community, { slug, userHasLogin })
}

const markLoading = (maybe = true) => store.mark({ loading: maybe })

// ###############################
// init & uninit handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('community'),
    action: ({ community }) => {
      markLoading(false)
      log('community: ', community)
      const activeThread = ARTICLE_THREAD.POST
      store.setViewing({ community, activeThread })
    },
  },
  {
    match: asyncRes('subscribeCommunity'),
    action: ({ subscribeCommunity }) => {
      store.addSubscribedCommunity(subscribeCommunity)
      loadCommunity()
    },
  },
  {
    match: asyncRes('unsubscribeCommunity'),
    action: ({ unsubscribeCommunity }) => {
      store.removeSubscribedCommunity(unsubscribeCommunity)
      loadCommunity()
    },
  },
  {
    match: asyncRes(EVENT.COMMUNITY_CHANGE),
    action: () => loadCommunity(),
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: () => markLoading(false),
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      markLoading(false)
      errRescue({ type: ERR.TIMEOUT, details, path: 'ThreadSidebar' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      markLoading(false)
      errRescue({ type: ERR.NETWORK, path: 'ThreadSidebar' })
    },
  },
]
export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    // log('effect init')
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      if (sub$) {
        sr71$.stop()
        sub$.unsubscribe()
      }
      // log('effect uninit')
    }
  }, [_store])
}
