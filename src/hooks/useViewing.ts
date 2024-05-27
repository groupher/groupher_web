import { useContext } from 'react'

import type { TArticle, TCommunity } from '@/spec'

import { StoreContext } from '@/stores2'

type TRet = {
  article: TArticle
  community: TCommunity
  updateViewingCommunity: (args: TCommunity) => void
}

const useViewing = (): TRet | null => {
  const { viewing: store } = useContext(StoreContext)
  const { viewingArticle, community, updateViewingCommunity } = store

  return {
    article: viewingArticle,
    community,
    updateViewingCommunity,
  }
}

export default useViewing
