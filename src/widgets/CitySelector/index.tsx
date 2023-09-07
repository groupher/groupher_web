/*
 *
 * CitySelector
 *
 */

import { FC, memo, useEffect, useState } from 'react'
import { find, includes, without, reject, isEmpty } from 'ramda'

import type { TCityOption, TSpace } from '@/spec'
import { CITY_OPTIONS, HOME_CITY_OPTIONS } from '@/constant/city'
import { buildLog } from '@/utils/logger'

import { Wrapper, Box, MoreBtn, Flag, InputLabel, Inputer } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:CitySelector:index')

type TProps = {
  radius?: number
  value?: string
  onChange: (value: string) => void
} & TSpace

const CitySelector: FC<TProps> = ({ radius = 5, value = '', onChange, ...restProps }) => {
  const [selected, setSelected] = useState(value.split(','))
  const [showMore, setShowMore] = useState(false)
  const [extraCities, setExtraCities] = useState('')

  useEffect(() => {
    const selectedCityValue = reject(isEmpty, selected).join(',')

    const cityVal = extraCities.trim()
      ? `${selectedCityValue},${extraCities.replaceAll('，', ',')}`
      : selectedCityValue

    onChange(reject(isEmpty, cityVal.split(',')).join(','))
  }, [selected, extraCities, onChange])

  const options = !showMore ? HOME_CITY_OPTIONS : CITY_OPTIONS

  return (
    <Wrapper {...restProps}>
      {options.map((option: TCityOption) => {
        const NationFlag = Flag[option.flag] || null

        const active = includes(option.value, selected)

        return (
          <Box
            $active={active}
            key={option.value}
            radius={radius}
            hasFlag={!!option.flag}
            onClick={() => {
              if (!find((item) => item === option.value, selected)) {
                setSelected([...selected, option.value])
              } else {
                setSelected(without([option.value], selected))
              }
            }}
          >
            {option.label}
            {NationFlag && <NationFlag $active={active} />}
          </Box>
        )
      })}
      {!showMore && <MoreBtn onClick={() => setShowMore(true)}>更多..</MoreBtn>}
      {showMore && (
        <>
          <InputLabel>或者，其他城市（地区）？</InputLabel>
          <Inputer
            placeholder="多个城市请用 , 分隔开"
            value={extraCities}
            onChange={(e) => setExtraCities(e.target.value)}
          />
        </>
      )}
    </Wrapper>
  )
}

export default memo(CitySelector)
