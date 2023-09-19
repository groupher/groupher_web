import { useEffect } from 'react'
// import { } from 'ramda'

import { buildLog } from '@/logger'

// import S from './schma'
import type { TStore } from './store'
import type { TTagsMode } from './spec'

let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:ChangelogThread')

export const tagsModeChange = (tagsMode: TTagsMode): void => {
  store.mark({ tagsMode })
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
