import { useEffect } from 'react'

import { uniq, reject, keys } from 'ramda'

import EVENT from '@/constant/event'

import { buildLog } from '@/utils/logger'
import asyncSuit from '@/utils/async'
import { send, errRescue, closeDrawer } from '@/utils/signal'
import { toJS } from '@/utils/mobx'
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

export const updatePassport = (): void => {
  const { curCommunity, allModeratorRules, selectedRules, activeModerator } = store
  const community = curCommunity.slug

  const innerRules = {}
  toJS(keys(JSON.parse(allModeratorRules))).forEach((key) => {
    innerRules[key] = false
  })

  toJS(selectedRules).forEach((key) => {
    innerRules[key] = true
  })

  const rules = JSON.stringify({
    [community]: innerRules,
  })

  sr71$.mutate(S.updateModeratorPassport, { community, user: activeModerator.login, rules })
}

export const loadUserPassport = (): void => {
  store.mark({ selectedRules: [] })
  sr71$.query(S.userPassport, { login: store.activeModerator.login })
}

export const loadAllPassportRules = (): void => {
  const { allPassportLoaded } = store
  if (allPassportLoaded) {
    loadUserPassport()
    return
  }

  sr71$.query(S.allPassportRules)
}

// ###############################
// init & uninit handlers
// ###############################
const DataSolver = [
  {
    match: asyncRes('user'),
    action: ({ user }) => {
      const { curCommunity } = store
      const { cmsPassportString } = user
      const passportJson = JSON.parse(cmsPassportString)

      if (passportJson[curCommunity.slug]) {
        store.mark({ selectedRules: keys(passportJson[curCommunity.slug]) })
      }
    },
  },

  {
    match: asyncRes('allPassportRules'),
    action: ({ allPassportRules }) => {
      const { moderator, root } = allPassportRules
      store.setAllPassportRules(root, moderator)
      sr71$.query(S.userPassport, { login: store.activeModerator.login })
    },
  },
  {
    match: asyncRes('updateModeratorPassport'),
    action: () => {
      closeDrawer()
      send(EVENT.REFRESH_MODERATORS)
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

    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    }
    loadAllPassportRules()

    return () => {
      sub$.unsubscribe()
      sub$ = null
    }
  }, [_store])
}
