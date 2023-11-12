/**
 * for reault returned by urql, ref:
 * https://formidable.com/open-source/urql/docs/api/urql/#usequery
 * https://formidable.com/open-source/urql/docs/api/core/#operationresult
 */
import { useQuery } from '@urql/next'

import type { TID } from '@/spec'
import { P } from '@/schemas'
import { DEFAULT_THEME } from '@/config'

import type {
  TSessionRes,
  TCommunityRes,
  TTagsRes,
  TPostRes,
  TChangelogRes,
  TPagedPostsRes,
  TGroupedKanbanPostsRes,
  TPagedChangelogsRes,
  TSSRQueryOpt,
  TTagsFilter,
  TArticlesFIlter,
} from './spec'
import { GQ_OPTION, TAGS_FILTER, ARTICLES_FILTER } from './constant'

import { commonRes } from './helper'

export { parseCommunity, parseThread, parseWallpaper, parseDashboard } from './helper'

export const useSession = (): TSessionRes => {
  const [result] = useQuery({
    query: P.sessionState,
    variables: {},
    pause: false,
    // NOTE: network-only will freeze the page, don't know why ...
    // requestPolicy: 'network-only',
    requestPolicy: 'cache-and-network',
  })

  return {
    ...commonRes(result),
    sesstion: {
      theme: {
        curTheme: DEFAULT_THEME,
      },
      account: {
        user: result.data?.sessionState?.user || {},
        isValidSession: result.data?.sessionState?.isValid,
      },
    },
  }
}

export const useCommunity = (slug: string, _opt: TSSRQueryOpt = {}): TCommunityRes => {
  const opt = { ...GQ_OPTION, ..._opt }

  const [result] = useQuery({
    query: P.community,
    variables: {
      slug,
      userHasLogin: false,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
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
    requestPolicy: opt.requestPolicy,
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
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    pagedPosts: result.data?.pagedPosts,
  }
}

export const usePost = (community: string, id: TID, _opt: TSSRQueryOpt = {}): TPostRes => {
  const opt = { ...GQ_OPTION, ..._opt }

  const [result] = useQuery({
    query: P.post,
    variables: {
      community,
      id,
      userHasLogin: false,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    post: result.data?.post,
  }
}

export const useGroupedKanbanPosts = (
  community: string,
  _opt: TSSRQueryOpt = {},
): TGroupedKanbanPostsRes => {
  const opt = { ...GQ_OPTION, ..._opt }

  const [result] = useQuery({
    query: P.groupedKanbanPosts,
    variables: {
      community,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    groupedKanbanPosts: result.data?.groupedKanbanPosts,
  }
}

export const usePagedChangelogs = (
  filter: TArticlesFIlter = ARTICLES_FILTER,
  _opt: TSSRQueryOpt = {},
): TPagedChangelogsRes => {
  const opt = { ...GQ_OPTION, ..._opt }

  const { page, size, community } = { ...ARTICLES_FILTER, ...filter }

  const [result] = useQuery({
    query: P.pagedChangelogs,
    variables: {
      filter: { page, size, community },
      userHasLogin: false,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    pagedChangelogs: result.data?.pagedChangelogs,
  }
}

export const useChangelog = (
  community: string,
  id: TID,
  _opt: TSSRQueryOpt = {},
): TChangelogRes => {
  const opt = { ...GQ_OPTION, ..._opt }

  const [result] = useQuery({
    query: P.changelog,
    variables: {
      community,
      id,
      userHasLogin: false,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    changelog: result.data?.changelog,
  }
}
