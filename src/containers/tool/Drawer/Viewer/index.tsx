import { Fragment } from 'react'

import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

/**
 * @param {object} props
 * @returns
 */
const Viewer = (props) => {
  const { isMobile } = useMobileDetect()

  return (
    <Fragment>
      {!isMobile && <DesktopView {...props} />}
      {isMobile && <MobileView {...props} />}
    </Fragment>
  )
}

export default Viewer
