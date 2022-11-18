/*
 *
 * Footer
 *
 */

import { Fragment } from 'react'

import DesktopView from './DesktopView'
// import MobileView from './MobileView'

const Footer = (props) => {
  return (
    <Fragment>
      <DesktopView {...props} />
    </Fragment>
  )
}

export default Footer
