import { DevHubReporter } from '@groupher/frontend-core/dev-hub-reporter/react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { LOCALE } from '~/const/i18n'
import { LANDING_INIT_DATA } from '~/const/name'
import { loadLocaleFile } from '~/i18n'
import landingMessages from '~/i18n/en/landing'
import { I18N_NS } from '~/i18n/namespaces'
import StaticLayout from '~/shell/StaticLayout'
import StaticShellProvider from '~/stores/StaticShellProvider'
import {
  PUBLIC_THEME_SEED,
  prePaintRuntimeSeedScript,
  prePaintThemeDetectScript,
} from '~/utils/ssr/script'

import '../domain.css'
import '../../../core/tailwind/global.css'
import NotFound from '../NotFound'
import Main from '../widgets/Main'

export const Route = createRootRoute({
  loader: async () => ({
    localeData: await loadLocaleFile(LOCALE.EN, I18N_NS.LANDING),
    renderedAt: Date.now(),
    theme: PUBLIC_THEME_SEED,
  }),
  head: () => ({
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'color-scheme', content: 'light dark' },
      { title: landingMessages['landing.meta.title'] },
      { name: 'description', content: landingMessages['landing.meta.description'] },
      { property: 'og:title', content: landingMessages['landing.meta.title'] },
      { property: 'og:description', content: landingMessages['landing.meta.description'] },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: landingMessages['landing.meta.title'] },
      { name: 'twitter:description', content: landingMessages['landing.meta.description'] },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  const { localeData, theme } = Route.useLoaderData()

  return (
    <>
      {import.meta.env.DEV ? (
        <DevHubReporter serviceId='landing' endpoint={import.meta.env.VITE_DEV_HUB_URL} />
      ) : null}
      <StaticShellProvider
        community={LANDING_INIT_DATA.community}
        footerLinks={LANDING_INIT_DATA.footerLinks}
        wallpaper={LANDING_INIT_DATA.wallpaper}
        locale={LOCALE.EN}
        localeData={JSON.stringify(localeData)}
        theme={theme}
      >
        <StaticLayout mainBlock={Main}>
          <Outlet />
        </StaticLayout>
      </StaticShellProvider>
    </>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { renderedAt, theme } = Route.useLoaderData()

  return (
    <html
      lang='en'
      data-theme={theme.theme}
      data-theme-mode={theme.themeMode}
      style={{ colorScheme: theme.theme }}
      suppressHydrationWarning
    >
      <head>
        <script
          // oxlint-disable-next-line react/no-danger -- Theme and time must be seeded before paint.
          dangerouslySetInnerHTML={{
            __html: `${prePaintThemeDetectScript(theme)}\n${prePaintRuntimeSeedScript(renderedAt)}`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
