import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TArticleFilter, TArticleCat, TArticleState } from '@/spec'

type TRes = {
  cat: TArticleCat
  state: TArticleState
  updateActiveFilter: (filter: TArticleFilter) => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useArticlesFilter = (): TRes => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    cat: store.articles.activeCat,
    state: store.articles.activeState,
    updateActiveFilter: store.articles.updateActiveFilter,
  }
}

export default useArticlesFilter
