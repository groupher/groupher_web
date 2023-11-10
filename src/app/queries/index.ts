/**
 * for reault returned by urql, ref:
 * https://formidable.com/open-source/urql/docs/api/urql/#usequery
 * https://formidable.com/open-source/urql/docs/api/core/#operationresult
 */
import { useQuery } from '@urql/next'

import { P } from '@/schemas'

import type {
  TCommunityRes,
  TTagsRes,
  TPagedPostsRes,
  TSSRQueryOpt,
  TTagsFilter,
  TArticlesFIlter,
} from './spec'
import { GQ_OPTION, TAGS_FILTER, ARTICLES_FILTER } from './constant'

import { commonRes } from './helper'

export { parseWallpaper, parseDashboard } from './helper'

export const useCommunity = (slug: string, _opt: TSSRQueryOpt = {}): TCommunityRes => {
  const opt = { ...GQ_OPTION, ..._opt }

  const [result] = useQuery({
    query: P.community,
    variables: {
      slug,
      userHasLogin: false,
    },
    pause: opt.skip,
  })

  return {
    ...commonRes(result),
    community: result.data?.community,
  }
}

export const useTags = (filter: TTagsFilter = TAGS_FILTER, _opt: TSSRQueryOpt = {}): TTagsRes => {
  const opt = { ...GQ_OPTION, ..._opt }
  const { community, thread } = { ...TAGS_FILTER, ...filter }

  const [result] = useQuery({
    query: P.pagedArticleTags,
    variables: {
      filter: {
        community,
        thread: thread.toUpperCase(),
      },
      userHasLogin: false,
    },
    pause: opt.skip,
  })

  return {
    ...commonRes(result),
    tags: result.data?.pagedArticleTags.entries,
  }
}

export const usePagedPosts = (
  filter: TArticlesFIlter = ARTICLES_FILTER,
  _opt: TSSRQueryOpt = {},
): TPagedPostsRes => {
  const opt = { ...GQ_OPTION, ..._opt }

  const { page, size, community } = { ...ARTICLES_FILTER, ...filter }

  const [result] = useQuery({
    query: P.pagedPosts,
    variables: {
      filter: { page, size, community },
      userHasLogin: false,
    },
    pause: opt.skip,
  })

  return {
    ...commonRes(result),
    pagedPosts: result.data?.pagedPosts,
  }
}
