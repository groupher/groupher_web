/*
 *
 * Footer
 *
 */

import { useState } from 'react'
import dynamic from 'next/dynamic'

import { Waypoint } from 'react-waypoint'

// import DesktopView from './DesktopView'
// import MobileView from './MobileView'

const DesktopView = dynamic(() => import('./DesktopView'), {
  ssr: false,
})

const Footer = (props) => {
  const [inView, setInView] = useState(false)

  return (
    <>
      <Waypoint onEnter={() => setInView(true)} topOffset="500px" />
      {inView && <DesktopView {...props} />}
    </>
  )
}

export default Footer
