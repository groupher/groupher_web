import type { TArticle, TCommunity } from '@/spec'

import useStoreTree from '@/hooks/useStoreTree'

type TRet = {
  article: TArticle
  community: TCommunity
  updateViewingCommunity: (args: TCommunity) => void
}

const useViewing = (): TRet | null => {
  const { viewingArticle, community, updateViewingCommunity } = useStoreTree('viewing')

  return {
    article: viewingArticle,
    community,
    updateViewingCommunity,
  }
}

export default useViewing
