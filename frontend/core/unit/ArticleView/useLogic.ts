import useViewingArticle from '~/hooks/useViewingArticle'
import type { TArticle, TArticleStats, TArticleViewerState } from '~/spec'

type TRet = {
  article: TArticle
  stats: TArticleStats | null
  viewerState: TArticleViewerState
  loading: boolean
}

/** Exposes logic state and actions through the shared React hook boundary. */
export default function useLogic(): TRet {
  const { article, stats, viewerState } = useViewingArticle()

  return {
    article,
    stats,
    viewerState,
    loading: !article,
  }
}
