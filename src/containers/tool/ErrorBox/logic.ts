import { has } from 'ramda'
import { useEffect } from 'react'

import type { TGQError } from '~/spec'
import EVENT from '~/const/event'
import ERR from '~/const/err'
import { asyncSuit, isObject } from '~/utils'

import type { TStore } from './store'

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.ERR_RESCUE],
})

let sub$ = null
let store: TStore | undefined

export const onClose = (): void => store.mark({ show: false })

const classifyGQErrors = (errors: TGQError[]): void => {
  if (!Array.isArray(errors)) {
    console.log('## invalid errors: ', errors)
    return
  }

  if (has('path', errors[0])) {
    if (isObject(errors[0].message)) {
      store.mark({
        graphqlType: 'changeset',
        changesetError: errors,
      })
      return
    }

    store.mark({
      graphqlType: 'custom',
      customError: errors,
    })

    return
  }

  store.mark({ graphqlType: 'parse', parseError: errors })
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes(EVENT.ERR_RESCUE),
    action: (res) => {
      const {
        type,
        data: { operation, details, path },
      } = res[EVENT.ERR_RESCUE]

      switch (type) {
        case ERR.GRAPHQL:
          classifyGQErrors(details)
          break

        case ERR.TIMEOUT:
          store.mark({ timeoutError: details, path })
          break

        default:
          console.log('## default')
      }

      store.mark({
        show: true,
        type,
        operation: operation || '--',
        path,
      })
    },
  },
]

const ErrSolver = []

// ###############################
// init & uninit
// ###############################
export const useInit = (_store: TStore): void =>
  useEffect(() => {
    store = _store
    // console.log('## effect init')
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      if (!sub$) return
      sub$.unsubscribe()
    }
  }, [_store])
