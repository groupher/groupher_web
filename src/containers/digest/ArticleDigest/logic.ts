import { useEffect } from 'react'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'
import asyncSuit from '@/utils/async'
import { send, errRescue } from '@/signal'
import { buildLog } from '@/logger'

import type { TStore } from './store'
import S from './schema'

/* eslint-disable-next-line */
const log = buildLog('L:ArticleDigest')

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71()

let store: TStore | undefined
let sub$ = null

export const inAnchor = (): void => {
  if (store) store.mark({ inViewport: true })
}

export const outAnchor = (): void => {
  if (store) store.mark({ inViewport: false })
}

export const onListReactionUsers = (type, data): void =>
  send(EVENT.USER_LISTER_OPEN, {
    type,
    data: { ...data, thread: store.activeThread },
  })

export const subscribeCommunity = (): void => {
  const { viewingArticle } = store
  const communityId = viewingArticle.originalCommunity.id

  sr71$.mutate(S.subscribeCommunity, { communityId })
}

export const unsubscribeCommunity = (): void => {
  const { viewingArticle } = store
  const communityId = viewingArticle.originalCommunity.id
  sr71$.mutate(S.unsubscribeCommunity, { communityId })
}

export const loadCommunity = (): void => {
  const { viewingArticle, isLogin } = store
  if (!isLogin) return

  const { slug } = viewingArticle.originalCommunity
  sr71$.query(S.community, { slug })
}

export const handleWorksUpvote = (viewerHasUpvoted: boolean): void => {
  //
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('community'),
    action: ({ community }) => {
      const { viewerHasSubscribed, subscribersCount } = community
      store.mark({ viewerHasSubscribed, subscribersCount })
    },
  },

  {
    match: asyncRes('subscribeCommunity'),
    action: () => loadCommunity(),
  },
  {
    match: asyncRes('unsubscribeCommunity'),
    action: () => loadCommunity(),
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
    action: ({ details }) => errRescue({ type: ERR.TIMEOUT, details, path: 'AccountEditor' }),
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => errRescue({ type: ERR.NETWORK, path: 'ArticleDigest' }),
  },
]

// ###############################
// init & uninit
// ###############################
export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    // log('effect init')
    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    }

    loadCommunity()

    return () => {
      // log('effect uninit')
      store.reset()
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
