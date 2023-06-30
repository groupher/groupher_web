// const webpack = require('webpack')

// next-plugins
// const withPlugins = require('next-compose-plugins')

const withPWA = require('next-pwa')({
  dest: 'public',
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// next-plugins end

// if move pwa config to witPlugins, it will not work
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compiler: {
    styledComponents: true,
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },
  experimental: {
    // appDir: true
    scrollRestoration: true,
  },
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
