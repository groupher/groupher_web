import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useMemo } from 'react'

import { LOCALE } from '~/const/i18n'
import METRIC from '~/const/metric'
import { FIELDS } from '~/constant/dsb-fields'
import { InitialNowProvider } from '~/hooks/useInitialNow'
import { createQueryClient, dsbKeys } from '~/query'
import type { TCommunity, TFooterLinks, TLocale } from '~/spec'
import CommunityStoreProvider from '~/stores/community/provider'
import LocaleStoreProvider from '~/stores/locale/provider'
import { MetricProvider } from '~/stores/metric'
import StaticWallpaperProvider from '~/stores/staticWallpaper/provider'
import ThemeStoreProvider from '~/stores/theme/provider'
import type { TInit as TThemeInit } from '~/stores/theme/spec'
import WallpaperStoreProvider from '~/stores/wallpaper/provider'
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
  const queryClient = useMemo(() => {
    const client = createQueryClient()
    client.setQueryData(dsbKeys.config(community.slug), dashboard)
    return client
  }, [community.slug, dashboard])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeStoreProvider initData={theme}>
        <InitialNowProvider initialNow={initialNow}>
          <LocaleStoreProvider initData={{ locale, localeData }}>
            <MetricProvider value={METRIC.LANDING}>
              <CommunityStoreProvider initData={community}>
                <StaticWallpaperProvider initData={wallpaper?.staticWallpaper}>
                  <WallpaperStoreProvider initData={wallpaper}>{children}</WallpaperStoreProvider>
                </StaticWallpaperProvider>
              </CommunityStoreProvider>
            </MetricProvider>
          </LocaleStoreProvider>
        </InitialNowProvider>
      </ThemeStoreProvider>
    </QueryClientProvider>
  )
}
