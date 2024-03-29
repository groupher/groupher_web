import { useEffect } from 'react'
// import { } from 'ramda'

import { buildLog } from '@/logger'

// import S from './schma'
import type { TStore } from './store'

let store: TStore | undefined

const log = buildLog('L:AboutThread')

export const someMethod = (): void => {
  //
}

// ###############################
// init & uninit handlers
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)
    // return () => store.reset()
  }, [_store])
}
