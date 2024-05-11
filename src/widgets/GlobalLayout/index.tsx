/*
 *
 * GlobalLayout
 *
 */

import { FC, ReactNode, lazy, Suspense } from 'react'
import { Provider as BalancerTextProvider } from 'react-wrap-balancer'

import METRIC from '@/constant/metric'

import useMetric from '@/hooks/useMetric'

import Mushroom from '@/containers/Mushroom'
import ThemePalette from '@/widgets/ThemePalette'

// import Broadcast from '@/widgets/Broadcast'
// import ModeLine from '@/containers/unit/ModeLine'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '@/widgets/CustomScroller'

import SEO from './SEO'
import Wallpaper from './Wallpaper'
import Main from './Main'

import { Skeleton, Wrapper, ScrollWrapper } from './styles'

const Addon = lazy(() => import('./Addon'))

// let DashboardAlert = null

type TProps = {
  children: ReactNode
}

const GlobalLayout: FC<TProps> = ({ children }) => {
  const metric = useMetric()

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
    <BalancerTextProvider>
      <ThemePalette>
        <Mushroom />
        <Suspense fallback={null}>
          <Addon />
        </Suspense>
        <Skeleton>
          <Wallpaper />
          <ScrollWrapper $noMobilePadding={metric === METRIC.HOME}>
            <Wrapper>
              <SEO />
              <Main>{children}</Main>
              {/* {isMobile && <ModeLine />} */}
            </Wrapper>
          </ScrollWrapper>
        </Skeleton>

        {/* {showDashboardAlertUI && <DashboardAlert />} */}
      </ThemePalette>
    </BalancerTextProvider>
  )
}

export default GlobalLayout
