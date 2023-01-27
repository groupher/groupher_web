/*
 *
 * RangeSlider
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'

import { Wrapper, Value, Unit, RangeInput } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:RangeSlider:index')

type TProps = {
  testid?: string
  value?: number
  unit?: string
  min?: number
  max?: number
  onChange?: (v: number) => void
}

// ref: https://codepen.io/thehonestape/pen/DRpEGX
const RangeSlider: FC<TProps> = ({
  testid = 'range-slider',
  value = 0,
  min = -15,
  max = 15,
  unit = 'deg',
  onChange,
}) => {
  return (
    <Wrapper testid={testid}>
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
