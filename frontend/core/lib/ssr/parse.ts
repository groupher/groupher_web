import { includes, reject } from 'ramda'

import { INIT_KANBAN_BOARDS, normalizeKanbanBoards } from '~/const/dashboard'
import { BUILTIN_ALIAS } from '~/const/name'
import { FIELDS } from '~/constant/dsb-fields'
import { removeEmptyValuesFromObject } from '~/helper'
import { DEFAULT_EFFECTIVE_PAGI_CONFIG } from '~/lib/pagination/params'
import { decodeWallpaperSettings } from '~/lib/wallpaperSettingsCodec'
import type { TWallpaperSettingsTransport } from '~/lib/wallpaperSettingsCodec'
import type {
  TCommunity,
  TDashboardPagination,
  TNameAlias,
  TParseDashboard,
  TParsedWallpaper,
  TPaginationSurface,
} from '~/spec'
import type { TWallpaperThemeState } from '~/stores/wallpaper/spec'

/** Parses wallpaper into the canonical frontend shared representation. */
export const parseWallpaper = (community: TCommunity): TParsedWallpaper => {
  if (!community) return {}

  const { dashboard } = community
  if (!dashboard) return {}
  const { wallpaper, wallpaperSettings } = dashboard
  const decodeTheme = (value: unknown): Partial<TWallpaperThemeState> | undefined => {
    if (!value) return undefined
    const decoded = decodeWallpaperSettings(value as TWallpaperSettingsTransport)
    return decoded.type === 'none' ? { type: decoded.type } : decoded
  }

  return {
    light: decodeTheme(wallpaperSettings?.light),
    dark: decodeTheme(wallpaperSettings?.dark),
    wallpaper: wallpaper ?? null,
    initWallpaper: {
      light: decodeTheme(wallpaperSettings?.light),
      dark: decodeTheme(wallpaperSettings?.dark),
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

const PAGINATION_SURFACES: readonly TPaginationSurface[] = ['posts', 'changelogs', 'comments']

const parseDashboardPagination = (pagination: unknown): TDashboardPagination => {
  const source = pagination && typeof pagination === 'object' ? pagination : {}

  return Object.fromEntries(
    PAGINATION_SURFACES.map((surface) => {
      const raw = (source as Record<string, unknown>)[surface]
      const value = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}

      return [
        surface,
        {
          ...DEFAULT_EFFECTIVE_PAGI_CONFIG,
          ...(value.api !== undefined ? { api: value.api } : {}),
          ...(value.mode !== undefined ? { mode: value.mode } : {}),
          ...(value.schema_version !== undefined ? { schemaVersion: value.schema_version } : {}),
          ...(value.schemaVersion !== undefined ? { schemaVersion: value.schemaVersion } : {}),
          ...(value.revision !== undefined ? { revision: value.revision } : {}),
          ...(value.default_size !== undefined ? { defaultSize: value.default_size } : {}),
          ...(value.defaultSize !== undefined ? { defaultSize: value.defaultSize } : {}),
          ...(value.max_size !== undefined ? { maxSize: value.max_size } : {}),
          ...(value.maxSize !== undefined ? { maxSize: value.maxSize } : {}),
        },
      ]
    }),
  ) as TDashboardPagination
}

/** Parses dashboard into the canonical frontend shared representation. */
export const parseDashboard = (community: TCommunity): TParseDashboard => {
  if (!community) {
    const defaultFields = { ...FIELDS, pagination: parseDashboardPagination(undefined) }
    return { ...defaultFields, original: defaultFields }
  }

  const { dashboard, moderators } = community

  if (!dashboard || Object.keys(dashboard).length === 0) {
    const defaultFields = { ...FIELDS, pagination: parseDashboardPagination(undefined) }
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
    contentShadow,
    pagination,
  } = dashboard
  const fieldsObj = removeEmptyValuesFromObject({
    enable,
    nameAlias: parseDashboardAlias([...(nameAlias ?? [])]),
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
      index: item.index ?? index,
    })),
    thirdPartyAnalytics,
    enabledThirdPartyAnalytics,
    contentShadow: contentShadow as boolean | undefined,
    pagination: parseDashboardPagination(pagination),
  }) as Partial<TParseDashboard>

  if (layout?.kanbanBoards?.length) {
    fieldsObj.kanbanBoards = normalizeKanbanBoards(layout.kanbanBoards)
  } else if (!fieldsObj.kanbanBoards?.length) {
    fieldsObj.kanbanBoards = INIT_KANBAN_BOARDS
  }

  if (Object.keys(fieldsObj).length === 0) {
    const defaultFields = { ...FIELDS, pagination: parseDashboardPagination(undefined) }
    return { ...defaultFields, original: defaultFields }
  }

  const mergedFields = { ...FIELDS, ...fieldsObj }
  return { ...mergedFields, original: mergedFields }
}
