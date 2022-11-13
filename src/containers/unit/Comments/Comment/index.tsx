import { memo } from 'react'

// import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
// import MobileView from './MobileView/index'

const Comment = (props) => {
  return <DesktopView {...props} />
  // return (
  //   <Fragment>
  //     {!isMobile ? <DesktopView {...props} /> : <MobileView {...props} />}
  //   </Fragment>
  // )
}

export default memo(Comment)
