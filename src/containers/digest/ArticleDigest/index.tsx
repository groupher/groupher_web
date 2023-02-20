/*
 *
 * ArticleDigest
 *
 */

// import { Fragment } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
// import MobileView from './MobileView/index'

const ArticleDigest = (props) => {
  return (
    <DesktopView {...props} />
    // <Fragment key={String(isMobile)}>
    //   {!isMobile ? <DesktopView {...props} /> : <MobileView {...props} />}
    // </Fragment>
  )
}

export default ArticleDigest
