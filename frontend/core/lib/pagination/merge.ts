import { articlePathKey, articlePathOf } from '~/query/articlePath'
import type { TArticle } from '~/spec'

/** Keeps first occurrence/pinned precedence and page boundaries for state batch ownership. */
export const mergeCursorArticlePages = <T extends TArticle>(chunks: readonly (readonly T[])[]) => {
  const seen = new Set<string>()
  let duplicateCount = 0
  const uniqueChunks = chunks.map((chunk) =>
    chunk.filter((article) => {
      const path = articlePathOf(article)
      if (!path.community || !path.thread || !path.innerId) return true
      const key = articlePathKey(path)
      if (seen.has(key)) {
        duplicateCount += 1
        return false
      }
      seen.add(key)
      return true
    }),
  )
  return { chunks: uniqueChunks, duplicateCount }
}

/** Composes the two canonical Article streams with pinned precedence for rendering. */
export const articlePageEntries = <
  TPage extends { entries: readonly unknown[]; pinnedEntries: readonly unknown[] },
>(
  page: TPage,
): readonly (TPage['entries'][number] | TPage['pinnedEntries'][number])[] => [
  ...page.pinnedEntries,
  ...page.entries,
]
