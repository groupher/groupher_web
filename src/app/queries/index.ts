/**
 * for reault returned by urql, ref:
 * https://formidable.com/open-source/urql/docs/api/urql/#usequery
 * https://formidable.com/open-source/urql/docs/api/core/#operationresult
 */
import { useQuery } from '@urql/next'

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
} from './spec'
import { GQ_OPTION, TAGS_FILTER } from './constant'

import { commonRes, usePagedArticlesParams, useArticleParams, useCommunityParam } from './helper'

export { parseCommunity, parseThread, parseWallpaper, parseDashboard } from './helper'

export const useSession = (): TSessionRes => {
  const [result] = useQuery({
    query: P.sessionState,
    variables: {},
    pause: false,
    // NOTE: network-only will freeze the page, don't know why ...
    // requestPolicy: 'network-only',
    // NOTE: this warning calling warning in console
    // requestPolicy: 'cache-and-network',
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

export const useCommunity = (_opt: TSSRQueryOpt = {}): TCommunityRes => {
  const opt = { ...GQ_OPTION, ..._opt }
  const slug = useCommunityParam()

  const [result] = useQuery({
    query: P.community,
    variables: {
      slug,
      userHasLogin: opt.userHasLogin,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    community: result.data?.community,
  }
}

export const useTags = (_opt: TSSRQueryOpt = {}): TTagsRes => {
  const opt = { ...GQ_OPTION, ..._opt }
  const community = useCommunityParam()
  const { thread } = TAGS_FILTER

  const [result] = useQuery({
    query: P.pagedArticleTags,
    variables: {
      filter: {
        community,
        thread: thread.toUpperCase(),
      },
      userHasLogin: opt.userHasLogin,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    tags: result.data?.pagedArticleTags.entries,
  }
}

export const usePagedPosts = (_opt: TSSRQueryOpt = {}): TPagedPostsRes => {
  const opt = { ...GQ_OPTION, ..._opt }
  const filter = usePagedArticlesParams()

  const [result] = useQuery({
    query: P.pagedPosts,
    variables: {
      filter,
      userHasLogin: opt.userHasLogin,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    pagedPosts: result.data?.pagedPosts,
  }
}

export const usePagedChangelogs = (_opt: TSSRQueryOpt = {}): TPagedChangelogsRes => {
  const opt = { ...GQ_OPTION, ..._opt }
  const filter = usePagedArticlesParams()

  const [result] = useQuery({
    query: P.pagedChangelogs,
    variables: {
      filter,
      userHasLogin: opt.userHasLogin,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    pagedChangelogs: result.data?.pagedChangelogs,
  }
}

export const usePost = (_opt: TSSRQueryOpt = {}): TPostRes => {
  const opt = { ...GQ_OPTION, ..._opt }

  const { community, id } = useArticleParams()

  const [result] = useQuery({
    query: P.post,
    variables: {
      community,
      id,
      userHasLogin: opt.userHasLogin,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    post: result.data?.post,
  }
}

export const useChangelog = (_opt: TSSRQueryOpt = {}): TChangelogRes => {
  const opt = { ...GQ_OPTION, ..._opt }
  const { community, id } = useArticleParams()

  const [result] = useQuery({
    query: P.changelog,
    variables: {
      community,
      id,
      userHasLogin: opt.userHasLogin,
    },
    pause: opt.skip,
    requestPolicy: opt.requestPolicy,
  })

  return {
    ...commonRes(result),
    changelog: result.data?.changelog,
  }
}

export const useGroupedKanbanPosts = (_opt: TSSRQueryOpt = {}): TGroupedKanbanPostsRes => {
  const community = useCommunityParam()
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
