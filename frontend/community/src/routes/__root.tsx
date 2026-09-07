import { loadCommunityRequestContext } from '@community/server/community'
import { loadThemeSeed } from '@community/server/theme'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  notFound,
} from '@tanstack/react-router'

import '../../../core/tailwind/global.css'
import type { ReactNode } from 'react'

import { prePaintRuntimeSeedScript, prePaintThemeDetectScript } from '~/lib/ssr/script'

import type { TRouterContext } from '../router-context'

export const Route = createRootRouteWithContext<TRouterContext>()({
  loader: async () => {
    const [theme, requestContext] = await Promise.all([
      loadThemeSeed(),
      loadCommunityRequestContext(),
    ])
    return { theme, renderedAt: Date.now(), directOriginPage: requestContext.directOriginPage }
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  const { directOriginPage } = Route.useLoaderData()
  if (directOriginPage) throw notFound()
  return <Outlet />
}

function RootDocument({ children }: { children: ReactNode }) {
  const { theme, renderedAt } = Route.useLoaderData()
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
