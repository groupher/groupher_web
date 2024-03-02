import { useMemo } from 'react'

import { reject, includes, values, isEmpty, mergeRight, startsWith } from 'ramda'
import { useParams, useSearchParams, usePathname } from 'next/navigation'

import type {
  TCommunity,
  TThread,
  TNameAlias,
  TDashboardPath,
  TDashboardBaseInfoRoute,
  TDashboardSEORoute,
  TDashboardDocRoute,
  TDashboardBroadcastRoute,
  TDashboardLayoutRoute,
  TDashboardAliasRoute,
  TPagedArticlesParams,
  TArticleParams,
} from '@/spec'
import { BUILDIN_ALIAS, HCN } from '@/constant/name'
import { THREAD } from '@/constant/thread'
import URL_PARAM from '@/constant/url_param'
import { nilOrEmpty } from '@/validator'
import {
  DASHBOARD_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
} from '@/constant/route'
import { removeEmptyValuesFromObject } from '@/helper'

import type { TGQSSRResult, TParsedWallpaper, TParseDashboard, TDashboardTab } from './spec'
import { ARTICLES_FILTER } from './constant'

export const commonRes = (result): TGQSSRResult => {
  return {
    fetching: result.fetching,
    error: result.error,
    stale: result.stale,
  }
}

export const useIsStaticQuery = (): boolean => {
  const pathname = usePathname()

  return startsWith('/_next/static', pathname)
}

export const useCommunityParam = (): string => {
  const params = useParams()

  return useMemo(() => parseCommunity(params.community as string), [params])
}

export const useThreadParam = (): string => {
  const pathname = usePathname()

  return useMemo(() => parseThread(pathname), [pathname])
}

export const useIdParam = (): string => {
  const params = useParams()

  return useMemo(() => params.id as string, [params])
}

/**
 * common url filter logic for all paged articles queries
 */
export const usePagedArticlesParams = (): TPagedArticlesParams => {
  const searchParams = useSearchParams()
  const community = useCommunityParam()

  const filter = reject(nilOrEmpty)({
    community,
    page: Number(searchParams.get(URL_PARAM.PAGE)) || 1,
    size: 20,
    articleTag: searchParams.get(URL_PARAM.TAG),
    cat: searchParams.get(URL_PARAM.CAT),
    state: searchParams.get(URL_PARAM.STATE),
    order: searchParams.get(URL_PARAM.ORDER),
  }) as TPagedArticlesParams

  return mergeRight(ARTICLES_FILTER, filter)
}

/**
 * common url filter logic for all paged articles queries
 */
export const useArticleParams = (): TArticleParams => {
  const params = useParams()

  return {
    community: useMemo(() => parseCommunity(params.community as string), [params]),
    id: params.id as string,
  }
}

export const parseCommunity = (communityPath: string): string => {
  if (!communityPath) return HCN
  if (communityPath === '_next') return null

  return communityPath
}

/**
 * parse active thread from pathname
 */
export const parseThread = (pathname: string): TThread | '' => {
  const _thread = pathname.split('/')[2] as TThread

  if (!includes(_thread, values(THREAD))) return THREAD.DASHBOARD

  return _thread
}

export const parseWallpaper = (community: TCommunity): TParsedWallpaper => {
  // NOTE: if the backend is not ready, return default config
  // @ts-ignore
  if (!community) return {}

  const { dashboard } = community
  const { wallpaper } = dashboard

  return {
    ...wallpaper,
    initWallpaper: {
      ...wallpaper,
    },
  }
}

const parseDashboardAlias = (nameAlias: TNameAlias[]): TNameAlias[] => {
  const changedAliasKeys = nameAlias.map((item) => item.original)
  const unChangedAlias = reject(
    (item: TNameAlias) => includes(item.original, changedAliasKeys),
    BUILDIN_ALIAS,
  )

  return reject((item: TNameAlias) => item.slug === '', [...nameAlias, ...unChangedAlias])
}

/**
 * parse the dashboard's cutTab & sub tab from pathname
 */
const parseDashboardThread = (pathname: string): TDashboardTab => {
  const segments = reject(isEmpty, pathname.split('/'))
  const isOverviewThread = segments.length === 2

  if (segments[1] !== THREAD.DASHBOARD) {
    return { curTab: DASHBOARD_ROUTE.OVERVIEW }
  }

  if (segments[1] === THREAD.DASHBOARD && isOverviewThread) {
    return {
      curTab: DASHBOARD_ROUTE.OVERVIEW as TDashboardPath,
    }
  }

  const dashThread = segments[2]
  const dashLeaf = segments[3]

  switch (dashThread) {
    case DASHBOARD_ROUTE.INFO: {
      return {
        curTab: DASHBOARD_ROUTE.INFO as TDashboardPath,
        baseInfoTab: (dashLeaf || DASHBOARD_BASEINFO_ROUTE.BASIC) as TDashboardBaseInfoRoute,
      }
    }

    case DASHBOARD_ROUTE.SEO: {
      return {
        curTab: DASHBOARD_ROUTE.SEO as TDashboardPath,
        seoTab: (dashLeaf || DASHBOARD_SEO_ROUTE.SEARCH_ENGINE) as TDashboardSEORoute,
      }
    }

    case DASHBOARD_ROUTE.DOC: {
      return {
        curTab: DASHBOARD_ROUTE.DOC as TDashboardPath,
        docTab: (dashLeaf || DASHBOARD_DOC_ROUTE.TABLE) as TDashboardDocRoute,
      }
    }

    case DASHBOARD_ROUTE.BROADCAST: {
      return {
        curTab: DASHBOARD_ROUTE.BROADCAST as TDashboardPath,
        broadcastTab: (dashLeaf || DASHBOARD_BROADCAST_ROUTE.GLOBAL) as TDashboardBroadcastRoute,
      }
    }

    case DASHBOARD_ROUTE.ALIAS: {
      return {
        curTab: DASHBOARD_ROUTE.ALIAS,
        aliasTab: (dashLeaf || DASHBOARD_ALIAS_ROUTE.THREAD) as TDashboardAliasRoute,
      }
    }

    case DASHBOARD_ROUTE.LAYOUT: {
      return {
        curTab: DASHBOARD_ROUTE.LAYOUT,
        layoutTab: (dashLeaf || DASHBOARD_LAYOUT_ROUTE.GLOBAL) as TDashboardLayoutRoute,
      }
    }

    default: {
      return {
        curTab: dashThread as TDashboardPath,
      }
    }
  }
}

export const parseDashboard = (community: TCommunity, pathname: string): TParseDashboard => {
  // NOTE: if the backend is not ready, return default config
  // @ts-ignore
  if (!community) return {}

  const { dashboard, moderators } = community
  const {
    enable,
    nameAlias,
    socialLinks,
    faqs,
    seo,
    layout,
    rss,
    baseInfo,
    headerLinks,
    footerLinks,
    mediaReports,
  } = dashboard

  const fieldsObj = removeEmptyValuesFromObject({
    enable,
    nameAlias: parseDashboardAlias(nameAlias),
    socialLinks,
    faqSections: faqs,
    ...baseInfo,
    ...seo,
    ...layout,
    ...rss,
    headerLinks,
    footerLinks,
    moderators,
    mediaReports,
  })

  return {
    ...fieldsObj,
    initSettings: {
      ...fieldsObj,
    },
    ...parseDashboardThread(pathname),
  }
}
