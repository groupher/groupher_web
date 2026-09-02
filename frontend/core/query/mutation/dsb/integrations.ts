import { omit } from 'ramda'

import type { TDsbFieldMap } from '~/spec'
import SettingsSchema from '~/unit/DsbThread/schema/settings'

import type { TDsbSaveContext, TDsbSaveRequest } from './types'

type TIntegrationsResponse = {
  updateDashboardMediaReports?: { mediaReports?: TDsbFieldMap['mediaReports'] }
  updateDashboardThirdPartyAnalytics?: {
    thirdPartyAnalytics?: TDsbFieldMap['thirdPartyAnalytics']
  }
}

const readMediaReportsResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const mediaReports = (data as TIntegrationsResponse)?.updateDashboardMediaReports?.mediaReports
  return mediaReports
    ? {
        mediaReports: mediaReports.map((item, index) => ({
          ...item,
          editUrl: item.url,
          index: item.index ?? index,
        })),
      }
    : {}
}
const readThirdPartyAnalyticsResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const thirdPartyAnalytics = (data as TIntegrationsResponse)?.updateDashboardThirdPartyAnalytics
    ?.thirdPartyAnalytics
  return thirdPartyAnalytics ? { thirdPartyAnalytics } : {}
}

/** Builds the media-report mutation input after removing editor-only metadata. */
export const buildMediaReportsSave = ({
  community,
  dashboard,
}: TDsbSaveContext): TDsbSaveRequest => ({
  schema: SettingsSchema.updateDashboardMediaReports,
  params: {
    community,
    mediaReports: dashboard.mediaReports.map((item) => omit(['editUrl'], item)),
  },
  readConfirmed: readMediaReportsResponse,
})

/** Builds the third-party analytics mutation input. */
export const buildThirdPartyAnalyticsSave = ({
  community,
  dashboard,
}: TDsbSaveContext): TDsbSaveRequest => ({
  schema: SettingsSchema.updateDashboardThirdPartyAnalytics,
  params: { community, thirdPartyAnalytics: dashboard.thirdPartyAnalytics },
  readConfirmed: readThirdPartyAnalyticsResponse,
})
