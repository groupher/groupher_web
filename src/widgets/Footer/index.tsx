/*
 *
 * Footer
 *
 */

import { Fragment, useState } from 'react'
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
    <Fragment>
      <Waypoint onEnter={() => setInView(true)} />
      {inView && <DesktopView {...props} />}
    </Fragment>
  )
}

export default Footer
