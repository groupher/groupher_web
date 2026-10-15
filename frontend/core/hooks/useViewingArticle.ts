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

  // Consumers of this hook are mounted behind the article viewer's loaded boundary.
  // Keep the provider's nullable state intact without throwing during its loading render.
  if (!article)
    return { ...article$, articleLink: '', articlePath: null as unknown as TArticlePath } as TRet
  const articlePath = articlePathOf(article)
  if (!articlePath.community || !articlePath.innerId || !isArticleThread(articlePath.thread)) {
    return { ...article$, articleLink: '', articlePath } as TRet
  }

  return {
    article,
    stats,
    viewerState,
    articleLink: parseArticleLink(article),
    articlePath,
  }
}
