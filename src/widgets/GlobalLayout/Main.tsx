/*
 *
 * GlobalLayout
 *
 */

import type { FC, ReactNode } from 'react'

import { blurRGB } from '~/fmt'
import METRIC from '~/const/metric'
import { TOPBAR_LAYOUT } from '~/const/layout'

import useMetric from '~/hooks/useMetric'
import useTrans from '~/hooks/useTrans'
import useTopbar from '~/hooks/useTopbar'
import useThemeData from '~/hooks/useThemeData'
import useWallpaper from '~/hooks/useWallpaper'
import useGossBlur from '~/hooks/useGossBlur'

// import Broadcast from '~/widgets/Broadcast'
import Footer from '~/widgets/Footer'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '~/widgets/CustomScroller'

import GlowBackground from './GlowBackground'

import { Wrapper, BodyWrapper, ContentWrapper } from './styles/main'

// let DashboardAlert = null

type TProps = {
  children: ReactNode
}

const Main: FC<TProps> = ({ children }) => {
  const { topbar, topbarBg } = useTopbar()
  const metric = useMetric()
  const { hasShadow } = useWallpaper()
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
    <Wrapper
      key={locale}
      metric={metric}
      $bgColor={bgColor}
      $hasShadow={hasShadow}
      $hasTopbar={metric !== METRIC.HOME && topbar === TOPBAR_LAYOUT.YES}
      $topbarBg={topbarBg}
    >
      {/* <Broadcast /> */}
      <ContentWrapper>
        <BodyWrapper>{children}</BodyWrapper>
        <Footer />
      </ContentWrapper>
      <GlowBackground />
    </Wrapper>
  )
}

export default Main
