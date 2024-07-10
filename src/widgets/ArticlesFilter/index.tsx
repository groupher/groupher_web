/*
 *
 * ArticlesFilter
 *
 */

import { memo } from 'react'

import DesktopView from './DesktopView'
// import MobileView from './MobileView'
// import ModelineView from './ModelineView'

const ArticlesFilter = () => {
  // const { isMobile, mode } = props
  // if (mode === 'modeline') {
  //   return <ModelineView {...props} />
  // }

  return <DesktopView />
  // return <>{isMobile ? <MobileView {...props} /> : <DesktopView {...props} />}</>
}

export default memo(ArticlesFilter)
