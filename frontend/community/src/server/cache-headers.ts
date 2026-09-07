import { getResponseHeader, setResponseHeader } from '@tanstack/react-start/server'

const splitTags = (value: string | string[] | undefined): string[] => {
  const values = Array.isArray(value) ? value : value ? [value] : []
  return values
    .flatMap((item) => item.split(','))
    .map((tag) => tag.trim())
    .filter(Boolean)
}

/** Merges route-loader tags so nested server functions cannot overwrite prior cache ownership. */
export const mergeCacheTags = (
  current: string | string[] | undefined,
  incoming: readonly string[],
): string[] => [...new Set([...splitTags(current), ...incoming])]

/** Applies the shared public cache policy and accumulates semantic tags for the whole request. */
export const setPublicCacheHeaders = (tags: readonly string[]): void => {
  setResponseHeader('cache-control', 'public, s-maxage=60, stale-while-revalidate=300')
  const merged = mergeCacheTags(getResponseHeader('cache-tag'), tags)
  setResponseHeader('cache-tag', merged.join(', '))
}
