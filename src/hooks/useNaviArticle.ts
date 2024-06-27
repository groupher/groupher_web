import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { includes, values, findIndex } from 'ramda'

import type { TArticle } from '~/spec'
import { plural } from '~/fmt'
import { ARTICLE_THREAD } from '~/const/thread'
import useViewingThread from '~/hooks/useViewingThread'
import useViewingArticle from '~/hooks/useViewingArticle'

type TRes = {
  previous: TArticle | null
  next: TArticle | null
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useNaviArticle = (): TRes => {
  const { store } = useContext(MobXProviderContext)
  const curThread = useViewingThread()
  const { article: viewingArticle } = useViewingArticle()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  if (!includes(curThread, values(ARTICLE_THREAD)) || !viewingArticle?.id) {
    return {
      previous: null,
      next: null,
    }
  }

  const viewingArticleId = viewingArticle.id

  let pagedArticles

  switch (curThread) {
    default: {
      pagedArticles = store.articles[`paged${plural(curThread, 'titleCase')}`]
      break
    }
  }

  const curIndex = findIndex((a: TArticle) => a.id === viewingArticleId, pagedArticles.entries)

  return {
    previous: pagedArticles.entries[curIndex - 1] || null,
    next: pagedArticles.entries[curIndex + 1] || null,
  }
}

export default useNaviArticle
