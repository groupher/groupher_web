import { Fragment, memo } from 'react'

import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

// const DesktopView = dynamic(() => import('./DesktopView'), { ssr: false })
// const MobileView = dynamic(() => import('./MobileView'), { ssr: false })

const Content = (props) => {
  const { isMobile } = useMobileDetect()

  // eslint-disable-next-line react/destructuring-assignment
  if (!props.visible) {
    return null
  }

  return <Fragment>{!isMobile ? <DesktopView {...props} /> : <MobileView {...props} />}</Fragment>
}

export default memo(Content)
