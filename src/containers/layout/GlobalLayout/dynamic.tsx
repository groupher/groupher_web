import dynamic from 'next/dynamic'

// export const Broadcast = dynamic(() => import('@/widgets/Broadcast'), {
//   /* eslint-disable react/display-name */
//   loading: () => <div />,
//   ssr: true,
// })

export const Addon = dynamic(() => import('./Addon'), {
  ssr: false,
})

export const GlowBackground = dynamic(() => import('./GlowBackground'), {
  ssr: false,
})

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
