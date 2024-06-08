import { memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

const MoreContent = () => {
  const { isMobile } = useMobileDetect()

  return !isMobile ? <DesktopView /> : <MobileView />
}

export default memo(MoreContent)
