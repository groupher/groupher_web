import { useEffect } from 'react'
// import { } from 'ramda'

// import S from './schma'
import type { TStore } from './store'

let store: TStore | undefined

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
    console.log('## useInit: ', store)
    // return () => store.reset()
  }, [_store])
}
