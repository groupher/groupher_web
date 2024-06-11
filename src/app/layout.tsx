import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import {
  StyledComponentsRegistry,
  GraphQLProvider,
  RootStoreProvider,
  MobxStoreProvider,
  StateStoreProvider,
  GlobalLayout,
} from './providers'

export const metadata: Metadata = {
  title: 'Groupher | 让你的产品听见用户的声音',
  description: '讨论区、看板、更新日志、帮助文档多合一，收集沉淀用户反馈，助你打造更好的产品。',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  // const token = cookies().get('jwtToken')?.value || null
  // const token = null
  // const theme = cookies().get('theme')?.value === 'night' ? 'night' : 'day'
  // const theme = 'day'

  // NOTE: SessionProvider is not nessary, just can not use useSession in component, which
  // has wired behavior for query /sesssion mutiple times.
  // import { SessionProvider } from 'next-auth/react'
  // <SessionProvider refetchOnWindowFocus={false}></SessionProvider>

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GraphQLProvider>
            <StateStoreProvider>
              <MobxStoreProvider>
                <RootStoreProvider>
                  <GlobalLayout>{children}</GlobalLayout>
                </RootStoreProvider>
              </MobxStoreProvider>
            </StateStoreProvider>
          </GraphQLProvider>
        </StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
