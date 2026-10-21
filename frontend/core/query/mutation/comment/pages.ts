import type { TComment } from '~/spec'

type TPage = {
  entries: TComment[]
  pinnedEntries?: TComment[]
  pageInfo?: { api: string; page?: number; hasNextPage?: boolean }
}
const record = (data: unknown): data is Record<string, unknown> =>
  !!data && typeof data === 'object'

/** Traverses actual query pages, preserving InfiniteData pageParams and independent page metadata. */
export const mapCommentPages = (
  data: unknown,
  update: (page: TPage, index: number) => TPage,
): unknown => {
  if (!record(data)) return data
  if (Array.isArray(data.pages))
    return {
      ...data,
      pages: data.pages.map((page, index) =>
        record(page) && Array.isArray(page.entries) ? update(page as TPage, index) : page,
      ),
    }
  return Array.isArray(data.entries) ? update(data as TPage, 0) : data
}
export const mapCommentEntries = (
  data: unknown,
  update: (entries: TComment[]) => TComment[],
): unknown =>
  mapCommentPages(data, (page) => ({
    ...page,
    entries: update(page.entries),
    ...(page.pinnedEntries ? { pinnedEntries: update(page.pinnedEntries) } : {}),
  }))
export const commentCacheEntries = (data: unknown): TComment[] => {
  const entries: TComment[] = []
  mapCommentPages(data, (page) => {
    entries.push(...page.entries, ...(page.pinnedEntries || []))
    return page
  })
  return entries
}
export const commentCollectionOf = (key: readonly unknown[]) => {
  if (key[5] !== 'page') return undefined
  const collection = key[6] as { rootInnerId?: string; mode?: string; sort?: string }
  const position = key[8] as { after?: string }
  return { ...collection, initialAfter: position.after }
}
