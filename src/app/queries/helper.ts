import { reject, includes, values, isEmpty } from 'ramda'

import type {
  TCommunity,
  TThread,
  TNameAlias,
  TDashboard,
  TDashboardPath,
  TDashboardSEORoute,
  TDashboardLayoutRoute,
} from '@/spec'
import { BUILDIN_ALIAS, HCN } from '@/constant/name'
import { THREAD } from '@/constant/thread'
import { DASHBOARD_ROUTE, DASHBOARD_SEO_ROUTE, DASHBOARD_LAYOUT_ROUTE } from '@/constant/route'
import { removeEmptyValuesFromObject } from '@/helper'

import type { TGQSSRResult, TParsedWallpaper } from './spec'

export const commonRes = (result): TGQSSRResult => {
  return {
    fetching: result.fetching,
    error: result.error,
    stale: result.stale,
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
export const parseThread = (pathname: string): TThread => {
  const _thread = pathname.split('/')[2] as TThread
  if (!includes(_thread, values(THREAD))) return THREAD.POST

  return _thread
}

export const parseWallpaper = (community: TCommunity): TParsedWallpaper => {
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

type TDashboardTab = {
  curTab: TDashboardPath
  seoTab?: TDashboardSEORoute
  layoutTab?: TDashboardLayoutRoute
}

const parseDashboardThread = (pathname: string): TDashboardTab => {
  const segments = reject(isEmpty, pathname.split('/'))
  const isOverviewThread = segments.length === 2

  if (segments[1] === THREAD.DASHBOARD && isOverviewThread) {
    return {
      curTab: DASHBOARD_ROUTE.OVERVIEW as TDashboardPath,
    }
  }

  if (segments[2] === DASHBOARD_ROUTE.SEO) {
    return {
      curTab: DASHBOARD_ROUTE.SEO as TDashboardPath,
      seoTab: (segments[3] || DASHBOARD_SEO_ROUTE.SEARCH_ENGINE) as TDashboardSEORoute,
    }
  }

  if (segments[2] === DASHBOARD_ROUTE.LAYOUT) {
    return {
      curTab: DASHBOARD_ROUTE.LAYOUT,
      layoutTab: (segments[3] || DASHBOARD_LAYOUT_ROUTE.GLOBAL) as TDashboardLayoutRoute,
    }
  }

  return {
    curTab: segments[2] as TDashboardPath,
  }
}

type TParseDashboard = TDashboard & {
  initSettings: TDashboard
}

export const parseDashboard = (community: TCommunity, pathname: string): TParseDashboard => {
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

  // console.log('## parseDashboardThread: ', parseDashboardThread(pathname))

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
