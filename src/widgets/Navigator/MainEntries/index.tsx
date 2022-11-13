import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'

const MobileView = dynamic(() => import('./MobileView'), {
  ssr: false,
})

const MainEntries = (props) => {
  const { isMobile } = useMobileDetect()

  return (
    <Fragment>
      {/* @ts-ignore */}
      {!isMobile ? <DesktopView {...props} /> : <MobileView {...props} />}
    </Fragment>
  )
}

export default MainEntries
