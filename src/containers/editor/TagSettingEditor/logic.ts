import { useEffect } from 'react'
// import { } from 'ramda'

import type { TPostLayout } from '@/spec'

import { buildLog } from '@/utils/logger'

// import S from './schma'
import type { TStore } from './store'

let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:TagSettingEditor')

export const edit = (layout: TPostLayout): void => {
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
