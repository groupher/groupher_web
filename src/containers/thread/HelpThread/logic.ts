import { useEffect } from 'react'
// import { } from 'ramda'

import { buildLog } from '@/utils/logger'

// import S from './schma'
import type { TStore } from './store'

let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:HelpThread')

export const gotoDetailLayout = (): void => {
  store.mark({ isArticleLayout: true, isFAQArticleLayout: false })
}

export const gotoFAQDetailLayout = (): void => {
  store.mark({ isArticleLayout: true, isFAQArticleLayout: true })
}

export const back2Layout = (): void => {
  store.mark({ isArticleLayout: false, isFAQArticleLayout: false })
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
