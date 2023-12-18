/*
 *
 * TrendLine
 *
 */

import { FC, memo } from 'react'
import Trend from 'react-trend'

import { buildLog } from '@/logger'
import useTheme from '@/hooks/useTheme'

const _log = buildLog('w:TrendLine:index')

type TProps = {
  data: number[]
  radius?: number
  width?: number
}

const TrendLine: FC<TProps> = ({ data, radius = 15, width = 5 }) => {
  const { themeMap } = useTheme()

  const {
    heatmap: { activityLow, activityHight },
  } = themeMap

  return (
    <Trend
      smooth
      data={data}
      gradient={[activityLow, activityHight]}
      radius={radius}
      strokeWidth={width}
      strokeLinecap="round"
    />
  )
}

export default memo(TrendLine)
