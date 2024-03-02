import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import {
  StyledComponentsRegistry,
  GraphQLProvider,
  RootStoreProvider,
  GlobalLayout,
} from './providers'

export const metadata: Metadata = {
  title: 'Groupher | 让你的产品听见用户的声音',
  description: '讨论区、看板、更新日志、帮助文档多合一，收集沉淀用户反馈，助你打造更好的产品。',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  // const token = cookies().get('jwtToken')?.value || null
  const token = null

  return (
    <html lang="en">
      <body>
        <GraphQLProvider token={token}>
          <h2>groupher 9</h2>
          <RootStoreProvider token={token}>
            <StyledComponentsRegistry>
              <GlobalLayout>{children}</GlobalLayout>
            </StyledComponentsRegistry>
          </RootStoreProvider>
        </GraphQLProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
