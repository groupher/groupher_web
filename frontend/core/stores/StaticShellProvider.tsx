import { type ReactNode, useMemo } from 'react'

import { LOCALE } from '~/const/i18n'
import METRIC from '~/const/metric'
import { FIELDS } from '~/constant/dsb-fields'
import { InitialNowProvider } from '~/hooks/useInitialNow'
import type { TCommunity, TFooterLinks, TLocale } from '~/spec'
import CommunityStoreProvider from '~/stores/community/provider'
import DsbConfigProvider from '~/stores/dsbConfig/provider'
import LocaleStoreProvider from '~/stores/locale/provider'
import { MetricProvider } from '~/stores/metric'
import StaticWallpaperProvider from '~/stores/staticWallpaper/provider'
import ThemeStoreProvider from '~/stores/theme/provider'
import type { TInit as TThemeInit } from '~/stores/theme/spec'
import type { TInit as TWallpaperInit } from '~/stores/wallpaper/spec'

type TProps = {
  children: ReactNode
  community: TCommunity
  footerLinks: TFooterLinks
  wallpaper?: TWallpaperInit
  locale?: TLocale
  localeData?: string
  initialNow?: number
  theme: TThemeInit
}

export default function StaticShellProvider({
  children,
  community,
  footerLinks,
  wallpaper,
  locale = LOCALE.EN,
  localeData = '{}',
  initialNow,
  theme,
}: TProps) {
  const dashboard = useMemo(
    () => ({
      ...FIELDS,
      footerLayout: footerLinks.layout,
      footerLinks: footerLinks.links,
      footerOnelineLinks: footerLinks.onelineLinks,
      original: {
        ...FIELDS,
        footerLayout: footerLinks.layout,
        footerLinks: footerLinks.links,
        footerOnelineLinks: footerLinks.onelineLinks,
      },
    }),
    [footerLinks],
  )
  return (
    <DsbConfigProvider initData={dashboard}>
      <ThemeStoreProvider initData={theme}>
        <InitialNowProvider initialNow={initialNow}>
          <LocaleStoreProvider initData={{ locale, localeData }}>
            <MetricProvider value={METRIC.LANDING}>
              <CommunityStoreProvider initData={community}>
                <StaticWallpaperProvider initData={wallpaper?.wallpaper}>
                  {children}
                </StaticWallpaperProvider>
              </CommunityStoreProvider>
            </MetricProvider>
          </LocaleStoreProvider>
        </InitialNowProvider>
      </ThemeStoreProvider>
    </DsbConfigProvider>
  )
}
