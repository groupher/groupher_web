import type { TArticle, TCommunity } from '@/spec'

import useStoreTree from '@/hooks/useStoreTree'

type TRet = {
  article: TArticle
  community: TCommunity
  updateViewingCommunity: (args: TCommunity) => void
}

const useViewing = (): TRet | null => {
  const store = useStoreTree('viewing')
  const { viewingArticle, community, updateViewingCommunity } = store

  return {
    article: viewingArticle,
    community,
    updateViewingCommunity,
  }
}

export default useViewing
