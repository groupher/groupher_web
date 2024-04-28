/**
 * for reault returned by urql, ref:
 * https://formidable.com/open-source/urql/docs/api/urql/#usequery
 * https://formidable.com/open-source/urql/docs/api/core/#operationresult
 */
import { values, includes } from 'ramda'
import { useQuery } from '@urql/next'
import { usePathname, useSearchParams } from 'next/navigation'

import type { TCommunity, TMetric, TThemeName } from '@/spec'
import { P } from '@/schemas'
import { THREAD, ARTICLE_THREAD } from '@/constant/thread'
import THEME from '@/constant/theme'
import METRIC from '@/constant/metric'
import URL_PARAM from '@/constant/url_param'
import { ARTICLE_CAT, ARTICLE_STATE, ARTICLE_ORDER } from '@/constant/gtd'

import type {
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
  useIsFrameworkQuery,
  useSkipStaticQuery,
  useIdParam,
  //
  parseWallpaper,
  parseDashboard,
} from './helper'

export { parseCommunity, useThreadParam } from './helper'

export const useThemeFromURL = (): TThemeName => {
  const searchParams = useSearchParams()
  const theme = searchParams.get('theme')

  if (theme === THEME.NIGHT) {
    return THEME.NIGHT
  }

  return THEME.DAY
}

export const useMetric = (): TMetric => {
  const thread = useThreadParam()
  const articleParams = useArticleParams()

  if (includes(thread, values(ARTICLE_THREAD)) && articleParams.id) {
    return METRIC.ARTICLE
  }

  if (thread === THREAD.DASHBOARD) {
    return METRIC.DASHBOARD
  }

  return METRIC.COMMUNITY
}

export const useCommunity = (): TCommunityRes => {
  const slug = useCommunityParam()
  const skipLandingQuery = useSkipStaticQuery()

  const [result] = useQuery({
    query: P.community,
    variables: {
      slug,
      userHasLogin: false,
    },
    pause: skipLandingQuery,
  })

  return {
    ...commonRes(result),
    community: result.data?.community,
  }
}

export const useTags = (): TTagsRes => {
  const community = useCommunityParam()
  const skipLandingQuery = useSkipStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.pagedArticleTags,
    variables: {
      filter: { community, thread: thread.toUpperCase() },
    },
    pause: !(!skipLandingQuery && includes(thread, values(ARTICLE_THREAD))),
  })

  return {
    ...commonRes(result),
    tags: result.data?.pagedArticleTags.entries,
  }
}

export const usePagedPosts = (): TPagedPostsRes => {
  const filter = usePagedArticlesParams()
  const thread = useThreadParam()
  const skipLandingQuery = useSkipStaticQuery()
  const id = useIdParam()

  const [result] = useQuery({
    query: P.pagedPosts,
    variables: { filter, userHasLogin: false },
    pause: !(!skipLandingQuery && thread === THREAD.POST && !id),
  })

  return {
    ...commonRes(result),
    pagedPosts: result.data?.pagedPosts,
  }
}

export const usePagedChangelogs = (): TPagedChangelogsRes => {
  const filter = usePagedArticlesParams()
  const skipLandingQuery = useSkipStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.pagedChangelogs,
    variables: { filter, userHasLogin: false },
    pause: !(!skipLandingQuery && thread === THREAD.CHANGELOG),
  })

  return {
    ...commonRes(result),
    pagedChangelogs: result.data?.pagedChangelogs,
  }
}

export const usePost = (): TPostRes => {
  const { community, id } = useArticleParams()
  const skipLandingQuery = useSkipStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.post,
    variables: { community, id, userHasLogin: false },
    pause: !(!skipLandingQuery && thread === THREAD.POST && id),
  })

  return {
    ...commonRes(result),
    post: result.data?.post,
  }
}

export const useChangelog = (): TChangelogRes => {
  const { community, id } = useArticleParams()
  const skipLandingQuery = useSkipStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.changelog,
    variables: { community, id, userHasLogin: false },
    pause: !(!skipLandingQuery && thread === THREAD.CHANGELOG && id),
  })

  return {
    ...commonRes(result),
    changelog: result.data?.changelog,
  }
}

export const useGroupedKanbanPosts = (): TGroupedKanbanPostsRes => {
  const community = useCommunityParam()
  const skipLandingQuery = useSkipStaticQuery()
  const thread = useThreadParam()

  const [result] = useQuery({
    query: P.groupedKanbanPosts,
    variables: { community, userHasLogin: false },
    pause: !(!skipLandingQuery && thread === THREAD.KANBAN),
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
  const isStaticQuery = useIsFrameworkQuery()

  // @ts-ignore
  return !isStaticQuery ? parseWallpaper(community) : {}
}

/**
 * general dashboard settings for all page
 */
export const useDashboard = (community: TCommunity): TParseDashboard => {
  const isStaticQuery = useIsFrameworkQuery()
  const pathname = usePathname()

  // @ts-ignore
  if (isStaticQuery || !community) return {}

  return parseDashboard(community, pathname)
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
