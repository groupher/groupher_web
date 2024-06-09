import type { TArticle, TCommunity } from '@/spec'

import useSubStore from '@/hooks/useSubStore'

type TRet = {
  article: TArticle
  community: TCommunity
  updateViewingCommunity: (args: TCommunity) => void
}

const useViewing = (): TRet | null => {
  const { viewingArticle, community, updateViewingCommunity } = useSubStore('viewing')

  return {
    article: viewingArticle,
    community,
    updateViewingCommunity,
  }
}

export default useViewing
