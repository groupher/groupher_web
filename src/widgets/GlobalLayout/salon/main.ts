import METRIC from '~/const/metric'
import { TOPBAR_LAYOUT } from '~/const/layout'

import useTwBelt from '~/hooks/useTwBelt'
import useMetric from '~/hooks/useMetric'
import useTopbar from '~/hooks/useTopbar'
import useWallpaper from '~/hooks/useWallpaper'

export default () => {
  const { cn, rainbow, container } = useTwBelt()

  const { topbar, topbarBg } = useTopbar()
  const metric = useMetric()
  const { hasShadow } = useWallpaper()

  const hasTopbar = metric !== METRIC.HOME && topbar === TOPBAR_LAYOUT.YES

  return {
    wrapper: cn(
      container(),
      'column w-full h-full min-h-fit',
      'relative transition-transform transition-shadow backdrop-blur-2xl',
      hasTopbar && 'border-t-2',
      hasTopbar && rainbow(topbarBg, 'border'),
      hasShadow && 'shadow-lg',
    ),
    scrollWrapper: 'absolute w-full',
    body: 'column-align-both w-full',
  }
}
