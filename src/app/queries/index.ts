/**
 * for reault returned by urql, ref:
 * https://formidable.com/open-source/urql/docs/api/urql/#usequery
 * https://formidable.com/open-source/urql/docs/api/core/#operationresult
 */
import { useQuery } from '@urql/next'
import { usePathname } from 'next/navigation'

import type { TCommunity } from '@/spec'
import { P } from '@/schemas'
import { DEFAULT_THEME } from '@/config'
import { THREAD } from '@/constant/thread'

import type {
  TSessionRes,
  TCommunityRes,
  TTagsRes,
  TPostRes,
  TChangelogRes,
  TPagedPostsRes,
  TGroupedKanbanPostsRes,
  TPagedChangelogsRes,
  TParsedWallpaper,
  TParseDashboard,
} from './spec'

import {
  commonRes,
  usePagedArticlesParams,
  useArticleParams,
  useCommunityParam,
  useThreadParam,
  useIdParam,
  //
  parseWallpaper,
  parseDashboard,
} from './helper'

export { parseCommunity, useThreadParam } from './helper'

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

export const useCommunity = (userHasLogin: boolean): TCommunityRes => {
  const slug = useCommunityParam()

  const [result] = useQuery({
    query: P.community,
    variables: {
      slug,
      userHasLogin,
    },
    // pause: opt.skip,
  })

  return {
    ...commonRes(result),
    community: result.data?.community,
  }
}

export const useTags = (): TTagsRes => {
  const community = useCommunityParam()
  const _thread = useThreadParam()
  const thread = _thread.toUpperCase()

  const [result] = useQuery({
    query: P.pagedArticleTags,
    variables: {
      filter: { community, thread },
    },
    // pause: opt.skip,
  })

  return {
    ...commonRes(result),
    tags: result.data?.pagedArticleTags.entries,
  }
}

export const usePagedPosts = (userHasLogin: boolean): TPagedPostsRes => {
  const filter = usePagedArticlesParams()
  const thread = useThreadParam()
  const id = useIdParam()

  const [result] = useQuery({
    query: P.pagedPosts,
    variables: { filter, userHasLogin },
    pause: !(thread === THREAD.POST && !id),
  })

  return {
    ...commonRes(result),
    pagedPosts: result.data?.pagedPosts,
  }
}

export const usePagedChangelogs = (userHasLogin: boolean): TPagedChangelogsRes => {
  const filter = usePagedArticlesParams()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.pagedChangelogs,
    variables: { filter, userHasLogin },
    pause: thread !== THREAD.CHANGELOG,
  })

  return {
    ...commonRes(result),
    pagedChangelogs: result.data?.pagedChangelogs,
  }
}

export const usePost = (userHasLogin: boolean): TPostRes => {
  const { community, id } = useArticleParams()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.post,
    variables: { community, id, userHasLogin },
    pause: !(thread === THREAD.POST && id),
  })

  return {
    ...commonRes(result),
    post: result.data?.post,
  }
}

export const useChangelog = (userHasLogin: boolean): TChangelogRes => {
  const { community, id } = useArticleParams()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.changelog,
    variables: { community, id, userHasLogin },
    pause: !(thread === THREAD.CHANGELOG && id),
  })

  return {
    ...commonRes(result),
    changelog: result.data?.changelog,
  }
}

export const useGroupedKanbanPosts = (userHasLogin: boolean): TGroupedKanbanPostsRes => {
  const community = useCommunityParam()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.groupedKanbanPosts,
    variables: { community, userHasLogin },
    pause: thread !== THREAD.KANBAN,
  })

  return {
    ...commonRes(result),
    groupedKanbanPosts: result.data?.groupedKanbanPosts,
  }
}

export const useWallpaper = (community: TCommunity): TParsedWallpaper => {
  return parseWallpaper(community)
}

export const useDashboard = (community: TCommunity): TParseDashboard => {
  const pathname = usePathname()

  return parseDashboard(community, pathname)
}
