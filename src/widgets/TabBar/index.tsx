/*
 * TabBar
 */

import { type FC, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TSizeSM, TThread } from '@/spec'
import VIEW from '@/const/view'

import type { TTabItem } from './spec'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

export type TProps = {
  source: TTabItem[]
  active: string
  size?: TSizeSM
  withIcon?: boolean
  onChange?: (thread: TThread) => void
}

const TabBar: FC<TProps> = (props) => {
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
