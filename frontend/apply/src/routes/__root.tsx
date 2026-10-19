import { DevHubReporter } from '@groupher/frontend-core/dev-hub-reporter/react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { lazy, Suspense, type ReactNode } from 'react'

import QueryProvider from '~/query/Provider'
import AccountStoreProvider from '~/stores/account/provider'

import AppShell from '../components/AppShell'
import { loadApplyAccount } from '../server/application'

import '../../../core/tailwind/global.css'
import '../styles/domain.css'

const AuthLoginModal = lazy(() => import('~/ui/AuthLoginModal'))

export const Route = createRootRoute({
  loader: () => loadApplyAccount(),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Create a community · Groupher' },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  const account = Route.useLoaderData()

  return (
    <QueryProvider>
      <AccountStoreProvider initData={account}>
        <AppShell>
          <Outlet />
        </AppShell>
        <Suspense fallback={null}>
          <AuthLoginModal />
        </Suspense>
        <DevHubReporter serviceId='apply' endpoint={process.env.NEXT_PUBLIC_DEV_HUB_URL} />
      </AccountStoreProvider>
    </QueryProvider>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
