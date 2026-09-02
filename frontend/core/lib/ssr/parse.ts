import { includes, reject } from 'ramda'

import { ASSETS_HUB_READ_ENDPOINT } from '~/config'
import { INIT_KANBAN_BOARDS, normalizeKanbanBoards } from '~/const/dashboard'
import { BUILTIN_ALIAS } from '~/const/name'
import { FIELDS } from '~/constant/dsb-fields'
import { removeEmptyValuesFromObject } from '~/helper'
import type { TCommunity, TNameAlias, TParseDashboard, TParsedWallpaper } from '~/spec'

/** Parses wallpaper into the canonical frontend shared representation. */
export const parseWallpaper = (community: TCommunity): TParsedWallpaper => {
  if (!community) return {}

  const { dashboard } = community
  const { wallpaper } = dashboard

  const staticAsset = (branch: typeof wallpaper.light) => {
    const assetPublicRef = branch?.staticAssetPublicRef
    if (!assetPublicRef) return null

    return {
      assetPublicRef,
      url: `${ASSETS_HUB_READ_ENDPOINT}/a/${assetPublicRef}/original`,
    }
  }

  const staticWallpaper = wallpaper.staticRevision
    ? {
        light: staticAsset(wallpaper.light),
        dark: staticAsset(wallpaper.dark),
        revision: wallpaper.staticRevision,
      }
    : null

  return {
    ...wallpaper,
    staticWallpaper,
    initWallpaper: {
      ...wallpaper,
    },
  }
}

const parseDashboardAlias = (nameAlias: TNameAlias[]): TNameAlias[] => {
  const changedAliasKeys = nameAlias.map((item) => item.original)
  const unChangedAlias = reject(
    (item: TNameAlias) => includes(item.original, changedAliasKeys),
    BUILTIN_ALIAS,
  )

  return reject((item: TNameAlias) => item.slug === '', [...nameAlias, ...unChangedAlias])
}

/** Parses dashboard into the canonical frontend shared representation. */
export const parseDashboard = (community: TCommunity): TParseDashboard => {
  if (!community) {
    const defaultFields = { ...FIELDS }
    return { ...defaultFields, original: defaultFields }
  }

  const { dashboard, moderators } = community

  if (!dashboard || Object.keys(dashboard).length === 0) {
    const defaultFields = { ...FIELDS }
    return { ...defaultFields, original: defaultFields }
  }

  const {
    enable,
    nameAlias,
    socialLinks,
    docFaq,
    seo,
    layout,
    rss,
    baseInfo,
    headerLinks,
    footerLinks,
    footerOnelineLinks,
    mediaReports,
    thirdPartyAnalytics,
    enabledThirdPartyAnalytics,
  } = dashboard
  const fieldsObj = removeEmptyValuesFromObject({
    enable,
    nameAlias: parseDashboardAlias([...nameAlias]),
    socialLinks,
    docFaq,
    ...baseInfo,
    ...seo,
    ...layout,
    ...rss,
    headerLinks,
    footerLinks,
    footerOnelineLinks,
    moderators,
    mediaReports: (mediaReports || []).map((item, index) => ({
      ...item,
      editUrl: item.url,
      index: item.index || index,
    })),
    thirdPartyAnalytics,
    enabledThirdPartyAnalytics,
  }) as Partial<TParseDashboard>

  if (layout?.kanbanBoards?.length) {
    fieldsObj.kanbanBoards = normalizeKanbanBoards(layout.kanbanBoards)
  } else if (!fieldsObj.kanbanBoards?.length) {
    fieldsObj.kanbanBoards = INIT_KANBAN_BOARDS
  }

  if (Object.keys(fieldsObj).length === 0) {
    const defaultFields = { ...FIELDS }
    return { ...defaultFields, original: defaultFields }
  }

  const mergedFields = { ...FIELDS, ...fieldsObj }
  return { ...mergedFields, original: mergedFields }
}
