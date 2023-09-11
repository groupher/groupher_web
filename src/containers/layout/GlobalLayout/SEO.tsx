/*
 *
 * SEO for different pages
 *
 */

import { FC } from 'react'
import Head from 'next/head'

import type { TMetric, TDashboardSEOConfig } from '@/spec'
import METRIC from '@/constant/metric'
import { SITE_URL, SITE_SLOGAN, SITE_NAME } from '@/config'
// import  METRIC  from '@/constant/metric'

type TProps = {
  metric: TMetric
  data: TDashboardSEOConfig
}

const SEO: FC<TProps> = ({ metric, data }) => {
  const {
    ogTitle,
    ogSiteName,
    ogUrl,
    ogDescription,
    // twitter
    twCard,
    twImageHeight,
    twImageWidth,
    twSite,
    twTitle,
    twImage,
    twDescription,
  } = data

  switch (metric) {
    case METRIC.HOME: {
      const title = 'Groupher | 让你的产品聆听用户的声音'
      const description = SITE_SLOGAN

      return (
        <Head>
          <title>{ogTitle}</title>
          <meta property="og:title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:url" content={SITE_URL} />
          <meta property="og:type" content="website" />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:site" content={SITE_NAME} />

          {/* {twImage && <meta property="twitter:image:src" content={twImage} />}
          {twImageWidth && <meta property="twitter:image:width" content={twImageWidth} />}
          {twImageHeight && <meta property="twitter:image:width" content={twImageHeight} />} */}
          {/* <meta property="twitter:card" content={twCard} /> */}
        </Head>
      )
    }

    default:
      return (
        <Head>
          <title>{ogTitle}</title>
          <meta property="og:title" content={ogTitle} />
          <meta name="description" content={ogDescription} />
          <meta property="og:description" content={ogDescription} />
          <meta property="og:site_name" content={ogSiteName} />
          <meta property="og:url" content={ogUrl} />
          <meta property="og:type" content="website" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <meta property="twitter:title" content={twTitle} />
          <meta property="twitter:description" content={twDescription} />
          <meta property="twitter:site" content={twSite} />

          {twImage && <meta property="twitter:image:src" content={twImage} />}
          {twImageWidth && <meta property="twitter:image:width" content={twImageWidth} />}
          {twImageHeight && <meta property="twitter:image:width" content={twImageHeight} />}

          <meta property="twitter:card" content={twCard} />
        </Head>
      )
  }
}

export default SEO
