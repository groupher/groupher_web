import type { PagedPostsFilter } from '~/graphql/generated/graphql'
import type { TPagedArticlesParams } from '~/spec'

import { normalizeArticleFilter } from './key'

/** Builds GraphQL list variables without serializing inactive optional filters as null. */
export const toArticleListFilter = (filter: TPagedArticlesParams): PagedPostsFilter => {
  const normalized = normalizeArticleFilter(filter)

  return {
    community: normalized.community,
    page: normalized.page,
    size: normalized.size,
    ...(normalized.communityTag ? { communityTag: normalized.communityTag } : {}),
    ...(normalized.communityTags.length > 0 ? { communityTags: normalized.communityTags } : {}),
    ...(normalized.cat ? { cat: normalized.cat as PagedPostsFilter['cat'] } : {}),
    ...(normalized.status ? { status: normalized.status as PagedPostsFilter['status'] } : {}),
    ...(normalized.order ? { order: normalized.order as PagedPostsFilter['order'] } : {}),
    ...(normalized.when ? { when: normalized.when as PagedPostsFilter['when'] } : {}),
    ...(normalized.sort ? { sort: normalized.sort as PagedPostsFilter['sort'] } : {}),
  }
}
