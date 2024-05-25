import { useEffect } from 'react'

// import ERR from '@/const/err'
import { buildLog } from '@/logger'
import type { TStore } from './store'

let store: TStore | undefined

const log = buildLog('L:RichEditor')

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
    log('effect init: ', store)

    return () => {
      // log('effect uninit')
    }
  }, [_store])
}
