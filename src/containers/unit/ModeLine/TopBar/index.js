import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

let CurTopBar = null

const Topbar = (props) => {
  const { isMobile } = useMobileDetect()

  useEffect(() => {
    if (isMobile) {
      CurTopBar = dynamic(() => import('./MobileView/index'), { ssr: false })
    }
    // else {
    //   CurTopBar = dynamic(() => import('./DesktopView'), { ssr: false })
    // }
  }, [])

  return (
    <React.Fragment>{CurTopBar && <CurTopBar {...props} />}</React.Fragment>
  )
}

export default React.memo(Topbar)
