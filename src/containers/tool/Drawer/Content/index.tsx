import { Fragment, memo } from 'react'
import dynamic from 'next/dynamic'

import useMobileDetect from '@groupher/use-mobile-detect-hook'

const DesktopView = dynamic(() => import('./DesktopView'), { ssr: false })
const MobileView = dynamic(() => import('./MobileView'), { ssr: false })

const Content = (props) => {
  const { isMobile } = useMobileDetect()

  return (
    <Fragment>
      {!isMobile ? <DesktopView {...props} /> : <MobileView {...props} />}
    </Fragment>
  )
}

export default memo(Content)
