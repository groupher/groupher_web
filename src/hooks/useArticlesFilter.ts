import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TArticleFilter, TArticleCat, TArticleState, TArticleOrder } from '~/spec'

type TRes = {
  cat: TArticleCat
  state: TArticleState
  order: TArticleOrder
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
    order: store.articles.activeOrder,
    cat: store.articles.activeCat,
    state: store.articles.activeState,
    updateActiveFilter: store.articles.updateActiveFilter,
  }
}

export default useArticlesFilter
