/**
 * for reault returned by urql, ref:
 * https://formidable.com/open-source/urql/docs/api/urql/#usequery
 * https://formidable.com/open-source/urql/docs/api/core/#operationresult
 */
import { values, includes } from 'ramda'
import { useQuery } from '@urql/next'
import { usePathname, useSearchParams } from 'next/navigation'

import type { TCommunity } from '@/spec'
import { P } from '@/schemas'
import { DEFAULT_THEME } from '@/config'
import { THREAD, ARTICLE_THREAD } from '@/constant/thread'
import URL_PARAM from '@/constant/url_param'
import { ARTICLE_CAT, ARTICLE_STATE, ARTICLE_ORDER } from '@/constant/gtd'

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
  TFilterSearchParams,
} from './spec'

import {
  commonRes,
  usePagedArticlesParams,
  useArticleParams,
  useCommunityParam,
  useThreadParam,
  useIsStaticQuery,
  useIdParam,
  //
  parseWallpaper,
  parseDashboard,
} from './helper'

export { parseCommunity, useThreadParam } from './helper'

export const useSession = (): TSessionRes => {
  const isStaticQuery = useIsStaticQuery()

  const [result] = useQuery({
    query: P.sessionState,
    variables: {},
    pause: isStaticQuery,
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
  const isStaticQuery = useIsStaticQuery()

  const [result] = useQuery({
    query: P.community,
    variables: {
      slug,
      userHasLogin,
    },
    pause: isStaticQuery,
  })

  return {
    ...commonRes(result),
    community: result.data?.community,
  }
}

export const useTags = (): TTagsRes => {
  const community = useCommunityParam()
  const isStaticQuery = useIsStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.pagedArticleTags,
    variables: {
      filter: { community, thread: thread.toUpperCase() },
    },
    pause: !(!isStaticQuery && includes(thread, values(ARTICLE_THREAD))),
  })

  return {
    ...commonRes(result),
    tags: result.data?.pagedArticleTags.entries,
  }
}

export const usePagedPosts = (userHasLogin: boolean): TPagedPostsRes => {
  const filter = usePagedArticlesParams()
  const thread = useThreadParam()
  const isStaticQuery = useIsStaticQuery()
  const id = useIdParam()

  const [result] = useQuery({
    query: P.pagedPosts,
    variables: { filter, userHasLogin },
    pause: !(!isStaticQuery && thread === THREAD.POST && !id),
  })

  return {
    ...commonRes(result),
    pagedPosts: result.data?.pagedPosts,
  }
}

export const usePagedChangelogs = (userHasLogin: boolean): TPagedChangelogsRes => {
  const filter = usePagedArticlesParams()
  const isStaticQuery = useIsStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.pagedChangelogs,
    variables: { filter, userHasLogin },
    pause: !(!isStaticQuery && thread === THREAD.CHANGELOG),
  })

  return {
    ...commonRes(result),
    pagedChangelogs: result.data?.pagedChangelogs,
  }
}

export const usePost = (userHasLogin: boolean): TPostRes => {
  const { community, id } = useArticleParams()
  const isStaticQuery = useIsStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.post,
    variables: { community, id, userHasLogin },
    pause: !(!isStaticQuery && thread === THREAD.POST && id),
  })

  return {
    ...commonRes(result),
    post: result.data?.post,
  }
}

export const useChangelog = (userHasLogin: boolean): TChangelogRes => {
  const { community, id } = useArticleParams()
  const isStaticQuery = useIsStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.changelog,
    variables: { community, id, userHasLogin },
    pause: !(!isStaticQuery && thread === THREAD.CHANGELOG && id),
  })

  return {
    ...commonRes(result),
    changelog: result.data?.changelog,
  }
}

export const useGroupedKanbanPosts = (userHasLogin: boolean): TGroupedKanbanPostsRes => {
  const community = useCommunityParam()
  const isStaticQuery = useIsStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.groupedKanbanPosts,
    variables: { community, userHasLogin },
    pause: !(!isStaticQuery && thread === THREAD.KANBAN),
  })

  return {
    ...commonRes(result),
    groupedKanbanPosts: result.data?.groupedKanbanPosts,
  }
}

/**
 * wallpaper related settings for all page
 */
export const useWallpaper = (community: TCommunity): TParsedWallpaper => {
  const isStaticQuery = useIsStaticQuery()

  // @ts-ignore
  return !isStaticQuery ? parseWallpaper(community) : {}
}

/**
 * general dashboard settings for all page
 */
export const useDashboard = (community: TCommunity): TParseDashboard => {
  const isStaticQuery = useIsStaticQuery()
  const pathname = usePathname()

  // @ts-ignore
  return !isStaticQuery ? parseDashboard(community, pathname) : {}
}

/**
 * parse cat & state from url search params
 * used for sync state in articles filter bar
 */
export const useFilterSearchParams = (): TFilterSearchParams => {
  const searchParams = useSearchParams()
  const filter = {
    activeCat: null,
    activeState: null,
    activeOrder: null,
  }

  const cat = searchParams.get(URL_PARAM.CAT)?.toUpperCase()
  const state = searchParams.get(URL_PARAM.STATE)?.toUpperCase()
  const order = searchParams.get(URL_PARAM.ORDER)?.toUpperCase()

  if (includes(cat, values(ARTICLE_CAT))) filter.activeCat = cat
  if (includes(state, values(ARTICLE_STATE))) filter.activeState = state
  if (includes(order, values(ARTICLE_ORDER))) filter.activeOrder = order

  return filter
}
