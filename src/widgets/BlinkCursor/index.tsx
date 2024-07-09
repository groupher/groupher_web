/*
 *
 * BlinkCursor
 *
 */

import { type FC, memo } from 'react'

import type { TSpace } from '~/spec'
import { Wrapper } from './styles'

type TProps = {
  testid?: string
  height?: number
  duration?: number
} & TSpace

const BlinkCursor: FC<TProps> = ({
  testid = 'blink-cursor',
  height = 12,
  top = 2,
  left = 10,
  right = 10,
  duration = 2,
}) => {
  return (
    <Wrapper
      $testid={testid}
      height={height}
      top={top}
      left={left}
      right={right}
      duration={duration}
    />
  )
}

export default memo(BlinkCursor)
