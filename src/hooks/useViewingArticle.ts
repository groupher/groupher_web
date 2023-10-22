import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import { SITE_URL } from '@/config'
import type { TArticle } from '@/spec'

type TRet = {
  article: TArticle
  articleLink: string
}

export const parseArticleLink = (article: TArticle): string => {
  if (!article?.meta?.thread) return ''

  const { meta, originalCommunity, innerId } = article
  const community = originalCommunity.slug
  const thread = meta.thread.toLowerCase()

  return `${SITE_URL}/${community}/${thread}/${innerId}`
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useViewingArticle = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { viewingArticle: article } = store.viewing

  return {
    article,
    articleLink: parseArticleLink(article),
  }
}

export default useViewingArticle
