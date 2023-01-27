import dynamic from 'next/dynamic'

// export const BannerBroadcast = dynamic(() => import('@/widgets/BannerBroadcast'), {
//   /* eslint-disable react/display-name */
//   loading: () => <div />,
//   ssr: true,
// })

export const Addon = dynamic(() => import('./Addon'), {
  ssr: false,
})

export const holder = 1
// export const Share = dynamic(() => import('@/containers/tool/Share'), {
//   /* eslint-disable react/display-name */
//   loading: () => <div />,
//   ssr: false,
// })

// export const AbuseReport = dynamic(
//   () => import('@/containers/tool/AbuseReport'),
//   {
//     /* eslint-disable react/display-name */
//     loading: () => <div />,
//     ssr: false,
//   },
// )

// export const ErrorBox = dynamic(() => import('@/containers/tool/ErrorBox'), {
//   /* eslint-disable react/display-name */
//   loading: () => <div />,
//   ssr: false,
// })
