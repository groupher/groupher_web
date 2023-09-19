import { useEffect } from 'react'

import type { TThread, TMetric } from '@/spec'
// eslint-disable-next-line import/named
import ERR from '@/constant/err'
import EVENT from '@/constant/event'
import TYPE from '@/constant/type'

import asyncSuit from '@/utils/async'
import { buildLog } from '@/utils/logger'
import { Global } from '@/utils/helper'
import { plural } from '@/utils/fmt'
import { atomizeValues } from '@/utils/graphql'
import { scrollToHeader } from '@/utils/dom'
import { toast, send, errRescue } from '@/signal'

import type { TStore } from './store'
import S from './schema'

/* eslint-disable-next-line */
const log = buildLog('L:Header')

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.SET_C11N],
})

let store: TStore | undefined
let sub$ = null

export const previewAccount = (): void => {
  // TODO:
}

// to avoid page-cache in server
export const checkSessionState = (): void => sr71$.query(S.sessionState, {})

export const onThreadChange = (activeThread: TThread): void => {
  // const activeThread = thread.slug
  const subPath = plural(activeThread)

  scrollToHeader()

  store.markRoute({ subPath })
  store.setViewing({ activeThread })
}

export const onLogin = (): void => send(EVENT.LOGIN_PANEL)
export const onLogout = (): void => {
  store.logout()

  setTimeout(() => {
    Global.location.reload()
  }, 2000)
}

export const openC11NPanel = (): void => {
  send(EVENT.DRAWER.OPEN, { type: TYPE.DRAWER.C11N_SETTINGS })
}

const DataSolver = [
  {
    match: asyncRes('sessionState'),
    action: ({ sessionState: state }) => {
      store.updateSession(state)
      if (state.isValid !== store.accountInfo.isValidSession) {
        send(EVENT.SESSION_CHANGED)
      }
    },
  },
  {
    match: asyncRes(EVENT.SET_C11N),
    action: (res) => {
      if (!store.isLogin) {
        toast('设置未保存: 请登录.', 'error')
        return false
      }
      const { data } = res[EVENT.SET_C11N]

      const customization = atomizeValues(data)
      sr71$.mutate(S.setCustomization, { customization })
    },
  },
  {
    // TODO: notify user if failed
    match: asyncRes('setCustomization'),
    action: () => {
      //
    },
    // log('set setCustomization done: ', setCustomization)
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
      errRescue({ type: ERR.TIMEOUT, details, path: 'Header' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      errRescue({ type: ERR.NETWORK, path: 'Header' })
    },
  },
]

// ###############################
// init & unInit
// ###############################
export const useInit = (_store: TStore, metric: TMetric): void => {
  useEffect(() => {
    store = _store
    store.mark({ metric })
    log('effect init')
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    checkSessionState()

    return () => {
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store, metric])
}
