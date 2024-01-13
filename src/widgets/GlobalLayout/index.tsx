/*
 *
 * GlobalLayout
 *
 */

import { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { Provider as BalancerTextProvider } from 'react-wrap-balancer'

import { blurRGB } from '@/fmt'
import METRIC from '@/constant/metric'
import { TOPBAR_LAYOUT } from '@/constant/layout'

import useMetric from '@/hooks/useMetric'
import useGlobalLayout from '@/hooks/useGlobalLayout'
import useThemeData from '@/hooks/useThemeData'
import useWallpaper from '@/hooks/useWallpaper'
import useGossBlur from '@/hooks/useGossBlur'

import Mushroom from '@/containers/Mushroom'
// import ModeLine from '@/containers/unit/ModeLine'

import ThemePalette from '@/widgets/ThemePalette'
// import Broadcast from '@/widgets/Broadcast'
import Footer from '@/widgets/Footer'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '@/widgets/CustomScroller'

import SEO from './SEO'
import Wallpaper from './Wallpaper'

import { Addon, GlowBackground } from './dynamic'

import {
  Skeleton,
  Wrapper,
  ScrollWrapper,
  InnerWrapper,
  BodyWrapper,
  ContentWrapper,
} from './styles'

// let DashboardAlert = null

type TProps = {
  children: ReactNode
}

const GlobalLayout: FC<TProps> = ({ children }) => {
  const globalLayout = useGlobalLayout()
  const metric = useMetric()
  const { hasShadow } = useWallpaper()
  const gossBlur = useGossBlur()

  const themeData = useThemeData()
  // const [showDashboardAlertUI, setShowDashboardAlertUI] = useState(false)

  const bgColor = `${blurRGB(themeData.htmlBg, gossBlur)}`

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
    <BalancerTextProvider>
      <ThemePalette>
        <Mushroom />
        <Addon />
        <Skeleton>
          <Wallpaper />
          <ScrollWrapper $noMobilePadding={metric === METRIC.HOME}>
            <Wrapper>
              <SEO />
              <InnerWrapper
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
              </InnerWrapper>
              {/* {isMobile && <ModeLine />} */}
            </Wrapper>
          </ScrollWrapper>
        </Skeleton>

        {/* {showDashboardAlertUI && <DashboardAlert />} */}
      </ThemePalette>
    </BalancerTextProvider>
  )
}

export default observer(GlobalLayout)
