import type { TDsbFieldMap } from '~/spec'
import SettingsSchema from '~/unit/DsbThread/schema/settings'

import type { TDsbSaveContext, TDsbSaveRequest } from './types'

type TLinksResponse = {
  updateDashboardSocialLinks?: { socialLinks?: TDsbFieldMap['socialLinks'] }
  updateDashboardHeaderLinks?: { headerLinks?: TDsbFieldMap['headerLinks'] }
  updateDashboardFooterLinks?: { footerLinks?: TDsbFieldMap['footerLinks'] }
  updateDashboardFooterOnelineLinks?: { footerOnelineLinks?: TDsbFieldMap['footerOnelineLinks'] }
}

const readSocialLinksResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const socialLinks = (data as TLinksResponse)?.updateDashboardSocialLinks?.socialLinks
  return socialLinks ? { socialLinks } : {}
}
const readHeaderLinksResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const headerLinks = (data as TLinksResponse)?.updateDashboardHeaderLinks?.headerLinks
  return headerLinks ? { headerLinks } : {}
}
const readFooterLinksResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const footerLinks = (data as TLinksResponse)?.updateDashboardFooterLinks?.footerLinks
  return footerLinks ? { footerLinks } : {}
}
const readFooterOnelineLinksResponse = (data: unknown): Partial<TDsbFieldMap> => {
  const footerOnelineLinks = (data as TLinksResponse)?.updateDashboardFooterOnelineLinks
    ?.footerOnelineLinks
  return footerOnelineLinks ? { footerOnelineLinks } : {}
}

/** Builds the header-links mutation input. */
export const buildHeaderLinksSave = ({
  community,
  dashboard,
}: TDsbSaveContext): TDsbSaveRequest => ({
  schema: SettingsSchema.updateDashboardHeaderLinks,
  params: { community, headerLinks: dashboard.headerLinks },
  readConfirmed: readHeaderLinksResponse,
})

/** Builds the footer-links mutation input. */
export const buildFooterLinksSave = ({
  community,
  dashboard,
}: TDsbSaveContext): TDsbSaveRequest => ({
  schema: SettingsSchema.updateDashboardFooterLinks,
  params: { community, footerLinks: dashboard.footerLinks },
  readConfirmed: readFooterLinksResponse,
})

/** Builds the compact one-line footer-links mutation input. */
export const buildFooterOnelineLinksSave = ({
  community,
  dashboard,
}: TDsbSaveContext): TDsbSaveRequest => ({
  schema: SettingsSchema.updateDashboardFooterOnelineLinks,
  params: { community, footerOnelineLinks: dashboard.footerOnelineLinks },
  readConfirmed: readFooterOnelineLinksResponse,
})

/** Builds the social-links mutation input. */
export const buildSocialLinksSave = ({
  community,
  dashboard,
}: TDsbSaveContext): TDsbSaveRequest => ({
  schema: SettingsSchema.updateDashboardSocialLinks,
  params: { community, socialLinks: dashboard.socialLinks },
  readConfirmed: readSocialLinksResponse,
})
