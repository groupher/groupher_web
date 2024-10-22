/*
 *
 * GlobalLayout
 *
 */

import type { FC, ReactNode } from 'react'

import dynamic from 'next/dynamic'

import Mushroom from '~/containers/Mushroom'
import ThemePalette from '~/widgets/ThemePalette'

// import Broadcast from '~/widgets/Broadcast'
// import ModeLine from '~/containers/unit/ModeLine'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '~/widgets/CustomScroller'

import SEO from './SEO'
import Wallpaper from './Wallpaper'
import Main from './Main'

import useSalon from './salon'

const Addon = dynamic(() => import('./Addon'), {
  ssr: false,
})

// let DashboardAlert = null

type TProps = {
  children: ReactNode
}

const GlobalLayout: FC<TProps> = ({ children }) => {
  const s = useSalon()

  // useSyncAccount()
  // const [showDashboardAlertUI, setShowDashboardAlertUI] = useState(false)
  // const isMobile = false

  // useEffect(() => {
  //   if (showDashboardAlert) {
  //     DashboardAlert = dynamic(() => import('./DashboardAlert'), { ssr: false })
  //     setShowDashboardAlertUI(true)
  //   } else {
  //     setShowDashboardAlertUI(false)
  //   }
  // }, [showDashboardAlert])

  return (
    <ThemePalette>
      <Mushroom />
      <Addon />
      <div className={s.skeleton}>
        <Wallpaper />
        <div className={s.scrollWrapper}>
          <div className={s.wrapper}>
            <SEO />
            <Main>{children}</Main>
          </div>
        </div>
      </div>

      {/* <DashboardAlert /> */}
      {/* {showDashboardAlertUI && <DashboardAlert />} */}
    </ThemePalette>
  )
}

export default GlobalLayout
