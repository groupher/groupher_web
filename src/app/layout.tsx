import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import {
  StyledComponentsRegistry,
  GraphQLProvider,
  RootStoreProvider,
  GlobalLayout,
} from './providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('jwtToken')?.value || null

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GraphQLProvider token={token}>
            <RootStoreProvider token={token}>
              {/* @ts-ignore */}
              <GlobalLayout>{children}</GlobalLayout>
            </RootStoreProvider>
          </GraphQLProvider>
        </StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
