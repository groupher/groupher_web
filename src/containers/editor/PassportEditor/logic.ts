import { useEffect } from 'react'

import { uniq, reject } from 'ramda'

import { buildLog } from '@/utils/logger'
import asyncSuit from '@/utils/async'
import { errRescue } from '@/utils/signal'
import ERR from '@/constant/err'

import S from './schema'
import type { TStore } from './store'

let sub$ = null
let store: TStore | undefined

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71()

/* eslint-disable-next-line */
const log = buildLog('L:PassportEditor')

export const toggleCheck = (rule: string, checked: boolean): void => {
  const { selectedRulesData } = store
  const _selectedRules = checked
    ? [...selectedRulesData, rule]
    : reject((i) => i === rule, selectedRulesData)

  store.mark({ selectedRules: uniq(_selectedRules) })
}

export const loadAllPassportRules = (): void => {
  sr71$.query(S.allPassportRules)
}

// ###############################
// init & uninit handlers
// ###############################
const DataSolver = [
  {
    match: asyncRes('allPassportRules'),
    action: ({ allPassportRules }) => {
      const { moderator, root } = allPassportRules
      store.mark({ allModeratorRules: moderator, allRootRules: root })
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => {
      errRescue({ type: ERR.GRAPHQL, details, path: 'PassportEditor' })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      errRescue({ type: ERR.TIMEOUT, details, path: 'PassportEditor' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => errRescue({ type: ERR.NETWORK, path: 'PassportEditor' }),
  },
]

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)

    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    }
    loadAllPassportRules()
    // return () => store.reset()
  }, [_store])
}
