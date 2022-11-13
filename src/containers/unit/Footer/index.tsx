/*
 *
 * Footer
 *
 */

import { Fragment } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

const FooterContainer = (props) => {
  const { isMobile } = useMobileDetect()

  return (
    <Fragment>
      {!isMobile ? <DesktopView {...props} /> : <MobileView {...props} />}
    </Fragment>
  )
}

export default FooterContainer
