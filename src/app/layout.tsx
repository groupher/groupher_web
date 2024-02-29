import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import {
  StyledComponentsRegistry,
  GraphQLProvider,
  RootStoreProvider,
  GlobalLayout,
} from './providers'

/**
import { getAnalyticsTag, handleRouteChange } from '@/utils/analytics/baidu'
<Head>
<meta charSet="utf-8" />
<meta name="renderer" content="webkit" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="application-name" content="Groupher" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Groupher" />
<meta name="description" content="可能是来为你心爱的产品建立一个反馈社区吧。" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta
  name="google-site-verification"
  content="GpUqIx4KXiL1s_tEpAf4nfPwccaAWP99IWQ_e-Ibaxg"
/>

<link rel="icon" href="/favicon.ico" />
<link rel="manifest" href="/manifest.json" />
</Head>
<Script
id="track-script"
strategy="afterInteractive"
dangerouslySetInnerHTML={getAnalyticsTag()}
/>
*/

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('jwtToken')?.value || null

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {/* <GraphQLProvider token={token}> */}
          <RootStoreProvider token={token}>
            {/* @ts-ignore */}
            <GlobalLayout>{children}</GlobalLayout>
          </RootStoreProvider>
          {/* </GraphQLProvider> */}
        </StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
