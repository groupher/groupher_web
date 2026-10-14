import { SITE_URL } from '~/config'
import { type TArticlePath, articlePathOf, isArticleThread } from '~/query/articlePath'
import type { TArticle, TArticleStats, TArticleViewerState } from '~/spec'
import useArticle from '~/stores/article/hooks'
import { thread2Path } from '~/utils/thread'

type TRet = {
  article: TArticle
  stats: TArticleStats | null
  viewerState: TArticleViewerState
  articleLink: string
  articlePath: TArticlePath
}

const parseArticleLink = (article: TArticle): string => {
  if (!article?.meta?.thread || !article.community) return ''

  const { community, innerId } = article
  const thread = thread2Path(article.meta.thread)

  return `${SITE_URL}/${community.slug}/${thread}/${innerId}`
}

/** Exposes viewing article state and actions through the shared React hook boundary. */
export default function useViewingArticle(): TRet {
  const article$ = useArticle()
  const { article, stats, viewerState } = article$

  if (!article) {
    throw new Error('useViewingArticle requires a loaded article')
  }
  const articlePath = articlePathOf(article)
  if (!articlePath.community || !articlePath.innerId || !isArticleThread(articlePath.thread)) {
    throw new Error('useViewingArticle requires a complete article path')
  }

  return {
    article,
    stats,
    viewerState,
    articleLink: parseArticleLink(article),
    articlePath,
  }
}
