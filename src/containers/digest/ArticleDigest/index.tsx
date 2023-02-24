/*
 *
 * ArticleDigest
 *
 */

// import { Fragment } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

const ArticleDigest = (props) => {
  const { isMobile } = useMobileDetect()

  return <>{isMobile ? <MobileView {...props} /> : <DesktopView {...props} />}</>
}

export default ArticleDigest
