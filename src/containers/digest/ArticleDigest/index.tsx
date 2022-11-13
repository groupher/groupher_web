/*
 *
 * ArticleDigest
 *
 */

import { Fragment } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView/index'

const ArticleDigest = (props) => {
  const { isMobile } = useMobileDetect()

  return (
    <Fragment key={String(isMobile)}>
      {!isMobile ? <DesktopView {...props} /> : <MobileView {...props} />}
    </Fragment>
  )
}

export default ArticleDigest
