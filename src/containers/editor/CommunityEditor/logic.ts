import { useEffect } from 'react'
import { pick } from 'ramda'

import EVENT from '~/const/event'
import ERR from '~/const/err'
import { errRescue } from '~/signal'
import asyncSuit from '~/async'

import type { TStore } from './store'
import { STEP } from './constant'

import S from './schema'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.LOGIN],
})

let store: TStore | undefined
let sub$ = null

const checkPendingApply = () => {
  // sr71$.query(S.hasPendingCommunityApply, {})
}

export const applyCommunity = (): void => {
  const args = pick(['title', 'logo', 'desc', 'slug', 'applyMsg'], store)

  store.mark({ submitting: true })

  sr71$.mutate(S.applyCommunity, {
    ...args,
    applyCategory: store.communityType,
    // tmp
    logo: 'https://assets.groupher.com/communities/groupher-alpha.png',
  })
}

/* when error occured cancel all the loading state */
const cancelLoading = () =>
  store.mark({
    subscribing: false,
    searching: false,
  })

const DataSolver = [
  {
    match: asyncRes('searchCommunities'),
    action: ({ searchCommunities: pagedCommunities }) =>
      store.mark({ pagedCommunities, searching: false }),
  },
  {
    match: asyncRes('isCommunityExist'),
    action: ({ isCommunityExist }) => {
      store.mark({ checking: false, communityExist: isCommunityExist.exist })

      if (!isCommunityExist.exist) {
        store.mark({ step: STEP.SETUP_INFO })
      }
    },
  },
  {
    match: asyncRes('hasPendingCommunityApply'),
    action: ({ hasPendingCommunityApply }) => {
      store.mark({ hasPendingApply: hasPendingCommunityApply.exist })
    },
  },
  {
    match: asyncRes('applyCommunity'),
    action: ({ applyCommunity }) => {
      const { slug, title, desc, logo } = applyCommunity

      store.mark({ step: STEP.FINISHED, submitting: false, slug, title, desc, logo })
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: () => cancelLoading(),
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      errRescue({ type: ERR.TIMEOUT, details, path: 'ExploreContent' })
      cancelLoading()
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      cancelLoading()
      errRescue({ type: ERR.NETWORK, path: 'ExploreContent' })
    },
  },
]

// ###############################
// init & uninit
// ###############################
export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    // console.log('## effect init')
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    checkPendingApply()

    return () => {
      // console.log('## effect uninit')
      if (!sub$) return
      // console.log('## ===== do uninit')
      sub$.unsubscribe()
    }
  }, [_store])
}
