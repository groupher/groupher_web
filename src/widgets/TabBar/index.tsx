/*
 * TabBar
 */

import { memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { VIEW } from '@/constant'
import { buildLog } from '@/utils/logger'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

/* eslint-disable-next-line */
const log = buildLog('w:TabBar:index')

const TabBar = (props) => {
  const { isMobile } = useMobileDetect()

  // const { view } = props
  const curMedia = isMobile ? VIEW.MOBILE : VIEW.DESKTOP
  // const curView = view && view === 'auto' ? curMedia : view
  const curView = curMedia

  switch (curView) {
    case VIEW.DESKTOP: {
      return <DesktopView {...props} />
    }

    default: {
      // for those mobile, modeline etc ..
      return <MobileView {...props} />
    }
  }
}

export default memo(TabBar)
