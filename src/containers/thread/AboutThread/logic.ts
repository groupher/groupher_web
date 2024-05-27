import { useEffect } from 'react'

// import S from './schma'
import type { TStore } from './store'

let store: TStore | undefined

export const someMethod = (): void => {
  //
}

// ###############################
// init & uninit handlers
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    console.log('## useInit: ', store)
    // return () => store.reset()
  }, [_store])
}
