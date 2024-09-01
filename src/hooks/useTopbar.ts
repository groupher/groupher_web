import type { TTopbarLayout, TColorName } from '~/spec'

import useTheme from '~/hooks/useTheme'
import useSubStore from '~/hooks/useSubStore'
import useMetric from '~/hooks/useMetric'

import { COLOR_NAME } from '~/const/colors'
import METRIC from '~/const/metric'
import { TOPBAR_LAYOUT } from '~/const/layout'

type TRet = {
  hasTopbar: boolean
  topbar: TTopbarLayout
  topbarBg: TColorName
  isDarkBlack: boolean
}

export default (): TRet => {
  const store = useSubStore('dashboard')
  const metric = useMetric()
  const { isLightTheme } = useTheme()

  const hasTopbar = metric !== METRIC.HOME && store.topbarLayout === TOPBAR_LAYOUT.YES
  const isDarkBlack = !isLightTheme && store.topbarBg === COLOR_NAME.BLACK

  return {
    hasTopbar,
    topbar: store.topbarLayout,
    topbarBg: store.topbarBg,
    isDarkBlack,
  }
}
