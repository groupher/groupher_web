/*
 *
 * GlobalLayout
 *
 */

import { FC, ReactNode } from 'react'

import { observer } from 'mobx-react-lite'
import { blurRGB } from '@/fmt'
import METRIC from '@/constant/metric'
import { TOPBAR_LAYOUT } from '@/constant/layout'

import useMetric from '@/hooks/useMetric'
import useGlobalLayout from '@/hooks/useGlobalLayout'
import useThemeData from '@/hooks/useThemeData'
import useWallpaper from '@/hooks/useWallpaper'
import useGossBlur from '@/hooks/useGossBlur'

// import Broadcast from '@/widgets/Broadcast'
import Footer from '@/widgets/Footer'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '@/widgets/CustomScroller'

import GlowBackground from './GlowBackground'

import { Wrapper, ScrollWrapper, BodyWrapper, ContentWrapper } from './styles/main'

// let DashboardAlert = null

type TProps = {
  children: ReactNode
}

const Main: FC<TProps> = ({ children }) => {
  const globalLayout = useGlobalLayout()
  const metric = useMetric()
  const { hasShadow } = useWallpaper()
  const gossBlur = useGossBlur()

  const themeData = useThemeData()
  // const [showDashboardAlertUI, setShowDashboardAlertUI] = useState(false)

  const bgColor = `${blurRGB(themeData.htmlBg, gossBlur)}`

  return (
    <Wrapper
      metric={metric}
      $bgColor={bgColor}
      $hasShadow={hasShadow}
      $hasTopbar={metric !== METRIC.HOME && globalLayout.topbar === TOPBAR_LAYOUT.YES}
      $topbarBg={globalLayout.topbarBg}
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

export default observer(Main)
