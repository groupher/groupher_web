import { COLOR } from '~/const/colors'
import { ARTICLE_STATUS } from '~/const/gtd'
import type { ArticlePathInput } from '~/lib/graphql/generated/graphql'
import type { TArticle, TArticleStatus, TColorName } from '~/spec'

/** Builds the mutation identity only after the detail route has supplied every path segment. */
export const getArticlePath = (article: TArticle): ArticlePathInput | null => {
  if (!article.innerId || !article.community?.slug || !article.meta?.thread) return null

  return {
    innerId: String(article.innerId),
    community: article.community.slug,
    thread: article.meta.thread,
  }
}

/** Returns gtdcolor for the frontend shared workflow. */
export const getGTDColor = (status: TArticleStatus, bgColors: TColorName[]): TColorName => {
  switch (status) {
    case ARTICLE_STATUS.BACKLOG: {
      return bgColors[0]
    }

    case ARTICLE_STATUS.TODO: {
      return bgColors[0]
    }
    case ARTICLE_STATUS.WIP: {
      return bgColors[1]
    }

    case ARTICLE_STATUS.DONE: {
      return bgColors[2]
    }

    default:
      return COLOR.RED
  }
}
