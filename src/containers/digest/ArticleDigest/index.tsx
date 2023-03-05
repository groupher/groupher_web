/*
 *
 * ArticleDigest
 *
 */

// import { Fragment } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'

const ArticleDigest = (props) => {
  const { isMobile } = props

  return <>{isMobile ? <MobileView {...props} /> : <DesktopView {...props} />}</>
}

export default ArticleDigest
