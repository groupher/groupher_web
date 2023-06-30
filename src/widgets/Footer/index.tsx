/*
 *
 * Footer
 *
 */

import { FC } from 'react'
// import dynamic from 'next/dynamic'

import type { TMetric, TFooterConfig } from '@/spec'
// import { Waypoint } from 'react-waypoint'

import DesktopView from './DesktopView'
// import MobileView from './MobileView'

// const DesktopView = dynamic(() => import('./DesktopView'), {
//   ssr: false,
// })

export type TProps = {
  metric?: TMetric
  config: TFooterConfig
  testid?: string
}

const Footer: FC<TProps> = (props) => {
  return (
    <>
      <DesktopView {...props} />
    </>
  )
}

export default Footer
