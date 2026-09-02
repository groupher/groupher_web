import { DSB_INFO_ROUTE } from '~/const/route'
import type { TDsbFieldMap } from '~/spec'
import SettingsSchema from '~/unit/DsbThread/schema/settings'

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

const BASIC_KEYS: readonly (keyof TDsbFieldMap)[] = [
  'locale',
  'title',
  'desc',
  'introduction',
  'homepage',
  'slug',
]

const OTHER_KEYS: readonly (keyof TDsbFieldMap)[] = ['city', 'techstack']

/** Builds the minimal enable-field mutation input for the changed toggle. */
export const buildEnableSave = ({
  community,
  dashboard,
  original,
}: TDsbSaveContext): TDsbSaveRequest => {
  const current = dashboard.enable
  const changedKey = Object.keys(current).find((key) => current[key] !== original[key])

  return {
    schema: SettingsSchema.updateDashboardEnable,
    params: changedKey ? { community, [changedKey]: current[changedKey] } : { community },
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
    subTab === DSB_INFO_ROUTE.OTHER ? OTHER_KEYS : subTab === DSB_INFO_ROUTE.BASIC ? BASIC_KEYS : []

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
