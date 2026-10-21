import { useEffect, useMemo } from 'react'

import { mergeCursorArticlePages } from '~/lib/pagination/merge'
import { recordPaginationEvent } from '~/lib/pagination/telemetry'
import type { TArticle } from '~/spec'

/** Merges cursor pages before public/private state queries, retaining a batch per loaded page. */
export default function useCursorArticleChunks<TPage, T extends TArticle>(
  pages: readonly TPage[] | undefined,
  entries: (page: TPage) => readonly T[],
  surface: 'posts' | 'changelogs',
) {
  const merged = useMemo(
    () => mergeCursorArticlePages(pages?.map((page) => entries(page)) || []),
    [pages, entries],
  )
  useEffect(() => {
    if (merged.duplicateCount > 0) {
      recordPaginationEvent({ surface, event: 'duplicate_entries', count: merged.duplicateCount })
    }
  }, [merged, surface])
  return merged.chunks
}
