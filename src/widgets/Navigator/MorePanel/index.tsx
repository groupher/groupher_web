import { Fragment, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

const MoreContent = () => {
  const { isMobile } = useMobileDetect()

  return <Fragment>{!isMobile ? <DesktopView /> : <MobileView />}</Fragment>
}

export default memo(MoreContent)
