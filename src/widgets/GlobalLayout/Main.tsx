/*
 *
 * GlobalLayout
 *
 */

import type { FC, ReactNode } from 'react'

import { blurRGB } from '~/fmt'

import useTrans from '~/hooks/useTrans'
import useThemeData from '~/hooks/useThemeData'
import useGossBlur from '~/hooks/useGossBlur'
import useTopbar from '~/hooks/useTopbar'

// import Broadcast from '~/widgets/Broadcast'
import Footer from '~/widgets/Footer'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '~/widgets/CustomScroller'

import GlowBackground from './GlowBackground'

import useSalon from './salon/main'

type TProps = {
  children: ReactNode
}

const Main: FC<TProps> = ({ children }) => {
  const s = useSalon()

  const { hasTopbar } = useTopbar()
  const gossBlur = useGossBlur()
  /**
   * this is tricy, when clientside changed locale, we force render hte entire app here
   * the action will make sure each component who use useTrans will not need to wrap with observer
   */
  const { locale } = useTrans()

  const themeData = useThemeData()
  // const [showDashboardAlertUI, setShowDashboardAlertUI] = useState(false)

  const bgColor = `${blurRGB(themeData.htmlBg, gossBlur)}`

  return (
    <div key={locale} className={s.wrapper} style={{ background: bgColor }}>
      {hasTopbar && <div className={s.topBar} />}
      {/* <Broadcast /> */}
      <div className={s.body}>{children}</div>
      <Footer />
      <GlowBackground />
    </div>
  )
}

export default Main
