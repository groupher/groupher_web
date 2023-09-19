import { useEffect } from 'react'
import { pick } from 'ramda'
import { confetti } from 'tsparticles-confetti'

import type { TEditValue } from '@/spec'
import EVENT from '@/constant/event'
import ERR from '@/constant/err'
import { sessionChanged, errRescue } from '@/utils/signal'
import asyncSuit from '@/utils/async'
import { buildLog } from '@/logger'
import { updateEditing } from '@/mobx'

import type { TStore } from './store'
import type { TCommunityType } from './spec'
import { STEP } from './constant'

import S from './schema'

/* eslint-disable-next-line */
const log = buildLog('L:ExploreContent')

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.LOGOUT, EVENT.LOGIN],
})

let store: TStore | undefined
let sub$ = null

/**
 * pervious step based on current step
 * 当前流程的上一步流程
 * @public
 */
export const pervStep = (): void => {
  const { step } = store

  if (step === STEP.SETUP_DOMAIN) store.mark({ step: STEP.SELECT_TYPE })
  if (step === STEP.SETUP_INFO) store.mark({ step: STEP.SETUP_DOMAIN })
  if (step === STEP.SETUP_EXTRA) store.mark({ step: STEP.SETUP_INFO })
}

/**
 * next step based on current step
 * 当前流程的下一步流程
 * @public
 */
export const nextStep = (): void => {
  const { step } = store

  if (step === STEP.SELECT_TYPE) store.mark({ step: STEP.SETUP_DOMAIN })
  if (step === STEP.SETUP_DOMAIN) {
    checkIfCommunityExist()
  }
  if (step === STEP.SETUP_INFO) {
    store.mark({ step: STEP.SETUP_EXTRA })
  }
  if (step === STEP.SETUP_EXTRA) {
    applyCommunity()
  }
}

const checkIfCommunityExist = () => {
  const { slug } = store

  store.mark({ checking: true, communityExist: false })
  sr71$.query(S.isCommunityExist, { slug })
}

const checkPendingApply = () => {
  sr71$.query(S.hasPendingCommunityApply, {})
}

/**
 * change the type of the creating community
 * 改变创建社区类型
 * @public
 */
export const communityTypeOnChange = (communityType: TCommunityType): void => {
  store.mark({ communityType })
}

export const isOfficalOnChange = (isOfficalValid: boolean): void => {
  store.mark({ isOfficalValid })
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

/**
 * handle input field change
 * @param {part} string field name
 * @param {e} htmlEvent
 * @public
 */
export const inputOnChange = (e: TEditValue, part: string): void => {
  if (part === 'slug') {
    store.mark({ communityExist: false })
  }
  updateEditing(store, part, e)
}

/**
 * finish tada effect
 */
export const tada = () => {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
  }

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 1.2,
      shapes: ['circle', 'square', 'heart'],
      colors: ['#F8D678', '#F5C5C8', '#BDA3F0', '#C9D8FD', '#DCF8FD'],
    })

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 1.8,
      shapes: ['text'],
      shapeOptions: {
        text: {
          value: ['🦄', '🌈'],
        },
      },
    })
  }

  setTimeout(shoot, 0)
  setTimeout(shoot, 100)
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
      // store.mark({ hasPendingApply: hasPendingCommunityApply.exist })
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

export const initAccount = () => {
  const { isLogin, accountInfo } = store

  if (isLogin) {
    sessionChanged(accountInfo)
  }
}

// ###############################
// init & uninit
// ###############################
export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    // log('effect init')
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    initAccount()

    if (store.isLogin) {
      checkPendingApply()
    }

    return () => {
      // log('effect uninit')
      if (!sub$) return
      // log('===== do uninit')
      sub$.unsubscribe()
    }
  }, [_store])
}
