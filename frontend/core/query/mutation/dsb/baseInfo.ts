import { DSB_INFO_ROUTE } from '~/const/route'
import type { TDsbFieldMap } from '~/spec'
import SettingsSchema from '~/unit/DsbThread/schema/settings'
import {
  BASEINFO_BASIC_KEYS,
  BASEINFO_LOGOS_KEYS,
  BASEINFO_OTHER_KEYS,
} from '~/unit/DsbThread/constant'

import type { TDsbSaveContext, TDsbSaveRequest } from './types'

type TSettingsResponse = {
  updateDashboardBaseInfo?: { baseInfo?: Partial<TDsbFieldMap> }
  updateDashboardEnable?: { enable?: TDsbFieldMap['enable'] }
  updateDashboardNameAlias?: { nameAlias?: TDsbFieldMap['nameAlias'] }
  updateDashboardDocFaq?: { docFaq?: TDsbFieldMap['docFaq'] }
}

const readBaseInfoResponse = (data: unknown): Partial<TDsbFieldMap> =>
  (data as TSettingsResponse)?.updateDashboardBaseInfo?.baseInfo ?? {}
const readEnableResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const enable = (data as TSettingsResponse)?.updateDashboardEnable?.enable
  return enable ? { enable } : {}
}
const readNameAliasResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const nameAlias = (data as TSettingsResponse)?.updateDashboardNameAlias?.nameAlias
  return nameAlias ? { nameAlias } : {}
}
const readDocFaqResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const docFaq = (data as TSettingsResponse)?.updateDashboardDocFaq?.docFaq
  return docFaq ? { docFaq } : {}
}

/** Builds the enable mutation from every field changed in the current draft. */
export const buildEnableSave = ({
  community,
  dashboard,
  original,
}: TDsbSaveContext): TDsbSaveRequest => {
  const current = dashboard.enable
  const changedKeys = Object.keys(current).filter((key) => current[key] !== original[key])

  return {
    schema: SettingsSchema.updateDashboardEnable,
    params: Object.fromEntries([
      ['community', community],
      ...changedKeys.map((key) => [key, current[key]]),
    ]),
    readConfirmed: readEnableResponse,
  }
}

/** Builds the base-info mutation input for the selected settings tab. */
export const buildBaseInfoSave = ({
  community,
  dashboard,
  subTab,
}: TDsbSaveContext & { subTab: string }): TDsbSaveRequest => {
  const params: Record<string, unknown> = { community }
  const fields =
    subTab === DSB_INFO_ROUTE.OTHER
      ? BASEINFO_OTHER_KEYS
      : subTab === DSB_INFO_ROUTE.BASIC
        ? BASEINFO_BASIC_KEYS
        : subTab === DSB_INFO_ROUTE.LOGOS
          ? BASEINFO_LOGOS_KEYS
          : []

  for (const key of fields) params[key] = dashboard[key]

  return {
    schema: SettingsSchema.updateDashboardBaseInfo,
    params,
    readConfirmed: readBaseInfoResponse,
  }
}

/** Builds the alias mutation input without starting the mutation. */
export const buildNameAliasSave = ({ community, dashboard }: TDsbSaveContext): TDsbSaveRequest => ({
  schema: SettingsSchema.updateDashboardNameAlias,
  params: { community, nameAlias: dashboard.nameAlias },
  readConfirmed: readNameAliasResponse,
})

/** Builds the Doc FAQ mutation input without coupling the editor to transport. */
export const buildDocFaqSave = ({ community, dashboard }: TDsbSaveContext): TDsbSaveRequest => ({
  schema: SettingsSchema.updateDashboardDocFaq,
  params: { community, docFaq: dashboard.docFaq },
  readConfirmed: readDocFaqResponse,
})
