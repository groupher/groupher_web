/*
 *
 * PostContent
 *
 */

// import { Fragment } from 'react'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

const ArticleContent = (props) => {
  const { isMobile } = props

  return <>{!isMobile ? <DesktopView {...props} /> : <MobileView {...props} />}</>
}

export default ArticleContent
