/*
 *
 * RangeSlider
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import type { TSpace } from '@/spec'
import { Wrapper, Value, Unit, RangeInput } from './styles'

const _log = buildLog('c:RangeSlider:index')

type TProps = {
  testid?: string
  value?: number
  unit?: string
  min?: number
  max?: number
  width?: string
  onChange?: (v: number) => void
} & TSpace

// ref: https://codepen.io/thehonestape/pen/DRpEGX
const RangeSlider: FC<TProps> = ({
  testid = 'range-slider',
  value = 0,
  min = -15,
  max = 15,
  width = 'auto',
  unit = 'deg',
  onChange,
  ...restProps
}) => {
  return (
    <Wrapper $testid={testid} width={width} {...restProps}>
      <Value>
        {value}
        <Unit>{unit}</Unit>
      </Value>
      <RangeInput
        value={value}
        type="range"
        min={min}
        max={max}
        onChange={(v) => onChange(parseInt(v.target.value, 10))}
      />
    </Wrapper>
  )
}

export default memo(RangeSlider)
