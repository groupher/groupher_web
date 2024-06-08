'use client'

/*
 *
 * Footer
 *
 */

import type { FC } from 'react'

import DesktopView from './DesktopView'
// import MobileView from './MobileView'

// const DesktopView = dynamic(() => import('./DesktopView'), {
//   ssr: false,
// })

export type TProps = {
  testid?: string
}

const Footer: FC<TProps> = (props) => {
  return <DesktopView {...props} />
}

export default Footer
