/*
 *
 * Tabs
 *
 */

import { memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import VIEW from '@/constant/view'
import { buildLog } from '@/logger'

import DesktopView from './DesktopView'
import MobileView from './MobileView/index'
import ModelineView from './ModelineView'
import DrawerView from './DrawerView'

/* eslint-disable-next-line */
const log = buildLog('w:Tabs:index')

const Tabs = (props) => {
  const { isMobile } = useMobileDetect()

  const { view } = props

  const curMedia = isMobile ? VIEW.MOBILE : VIEW.DESKTOP
  const curView = view === 'auto' ? curMedia : view

  switch (curView) {
    case VIEW.MOBILE: {
      return <MobileView {...props} />
    }

    case VIEW.MODELINE: {
      return <ModelineView {...props} />
    }

    case VIEW.DRAWER: {
      return <DrawerView {...props} />
    }

    default: {
      return <DesktopView {...props} />
    }
  }
}

export default memo(Tabs)
