// const webpack = require('webpack')

// next-plugins
// const withPlugins = require('next-compose-plugins')

// const withPWA = require('next-pwa')({
//   dest: 'public',
// })

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// next-plugins end

// if move pwa config to witPlugins, it will not work
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['ramda'],
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true,
  },
  // only in dev
  // see https://nextjs.org/docs/pages/building-your-application/rendering
  //     https://github.com/vercel/next.js/issues/35822
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
}

// module.exports = withBundleAnalyzer(withPWA(nextConfig))
module.exports = nextConfig
