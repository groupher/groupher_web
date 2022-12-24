import { useEffect, Fragment } from 'react'
// import { Provider } from 'mobx-react'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { getAnalyticsTag, handleRouteChange } from '@/utils/analytics/baidu'

// import { useStore } from '@/stores/init'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // const store = useStore()

  return (
    <Fragment>
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
        <link rel="icon" href="/favicon.ico" />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Script
        id="track-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={getAnalyticsTag()}
      />
      {/* <Script
        strategy="afterInteractive"
        data-domain="groupher.com"
        src="https://plausible.io/js/plausible.js"
      /> */}
      {/* <Provider store={store}> */}
      <Component {...pageProps} />
      {/* </Provider> */}
    </Fragment>
  )
}

export default App
