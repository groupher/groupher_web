import { useEffect } from 'react'

// import ERR from '~/const/err'
import type { TStore } from './store'

let store: TStore | undefined

export const someMethod = (): void => {
  /* todo */
}

// const const cancelLoading = () => {}

// ###############################
// Data & Error handlers
// ###############################

// ###############################
// init & uninit
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    console.log('## effect init: ', store)

    return () => {
      // console.log('## effect uninit')
    }
  }, [_store])
}
