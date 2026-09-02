import type { TMetric } from '~/spec'
import useMetricContext from '~/stores/metric/hooks'

type TFmt = 'default' | 'lowercase'

export default (fmt: TFmt = 'default'): TMetric => {
  const metric = useMetricContext()

  if (fmt === 'lowercase') {
    return metric.toLowerCase() as TMetric
  }

  return metric
}
