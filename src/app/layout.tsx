import { cookies } from 'next/headers'

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
            <RootStoreProvider>
              <GlobalLayout>{children}</GlobalLayout>
            </RootStoreProvider>
          </GraphQLProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
