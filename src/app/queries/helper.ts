import { reject, includes } from 'ramda'

import type { TCommunity, TNameAlias, TDashboard } from '@/spec'
import { removeEmptyValuesFromObject } from '@/helper'

// TODO: move to global constant
import { BUILDIN_ALIAS } from '@/containers/thread/DashboardThread/constant'

import type { TGQSSRResult, TParsedWallpaper } from './spec'

export const DEFAULT_OPTION = {
  skip: false,
  policy: 'cache-first',
}

export const commonRes = (result): TGQSSRResult => {
  return {
    fetching: result.fetching,
    error: result.error,
    stale: result.stale,
  }
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

type TParseDashboard = TDashboard & {
  initSettings: TDashboard
}

export const parseDashboard = (community: TCommunity): TParseDashboard => {
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
  }
}
