/*
 *
 * Footer
 *
 */

import { useState } from 'react'
import dynamic from 'next/dynamic'

import { Waypoint } from 'react-waypoint'

import { Wrapper } from './styles'
// import DesktopView from './DesktopView'
// import MobileView from './MobileView'

const DesktopView = dynamic(() => import('./DesktopView'), {
  ssr: false,
})

const Footer = (props) => {
  const [inView, setInView] = useState(false)

  return (
    <Wrapper testid="footer">
      <Waypoint onEnter={() => setInView(true)} />
      {inView && <DesktopView {...props} />}
    </Wrapper>
  )
}

export default Footer
