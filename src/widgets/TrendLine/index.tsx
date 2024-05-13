/*
 *
 * TrendLine
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

const _log = buildLog('w:TrendLine:index')

type TProps = {
  data: number[]
  radius?: number
  width?: number
}

const TrendLine: FC<TProps> = ({ data, radius = 15, width = 5 }) => {
  return <>removed</>
}

export default memo(TrendLine)
