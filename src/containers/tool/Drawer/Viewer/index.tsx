import { Fragment } from 'react'
import dynamic from 'next/dynamic'

import useMobileDetect from '@groupher/use-mobile-detect-hook'

const DesktopView = dynamic(() => import('./DesktopView'), { ssr: false })
const MobileView = dynamic(() => import('./MobileView'), { ssr: false })

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
