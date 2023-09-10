/*
 *
 * CitySelector
 *
 */

import { FC, memo, useCallback, useEffect, useState } from 'react'
import { find, includes, without, reject, isEmpty } from 'ramda'

import type { TCityOption, TSpace } from '@/spec'
import { CITY_OPTIONS, HOME_CITY_OPTIONS, CITY_OPTION_VALUES } from '@/constant/city'
import { buildLog } from '@/utils/logger'

import { Wrapper, Box, MoreBtn, Flag, InputLabel, Inputer } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:CitySelector:index')

type TProps = {
  radius?: number
  value?: string
  onChange?: (value: string) => void
} & TSpace

const CitySelector: FC<TProps> = ({ radius = 5, value = '', onChange = log, ...restProps }) => {
  const [selected, setSelected] = useState(value.split(','))
  const [showMore, setShowMore] = useState(false)
  const [extraCities, setExtraCities] = useState('')

  useEffect(() => {
    const splitedValue = value.split(',')
    const extraCities = []
    const selectedCities = []

    splitedValue.forEach((item) => {
      if (!includes(item, CITY_OPTION_VALUES)) {
        extraCities.push(item)
      } else {
        selectedCities.push(item)
      }
    })

    setSelected(selectedCities)

    if (!isEmpty(extraCities)) {
      setExtraCities(extraCities.join(','))
      setShowMore(true)
    }
  }, [value])

  const options = !showMore ? HOME_CITY_OPTIONS : CITY_OPTIONS

  const calcCityValue = useCallback((extraCityValue: string, selectedCityValue: string) => {
    return extraCityValue.trim()
      ? `${selectedCityValue},${extraCityValue.replaceAll('，', ',')}`
      : selectedCityValue
  }, [])

  const cityOnChange = (option) => {
    let selectedAfter
    if (!find((item) => item === option.value, selected)) {
      selectedAfter = [...selected, option.value]
    } else {
      selectedAfter = without([option.value], selected)
    }

    setSelected(selectedAfter)

    const selectedCityValue = reject(isEmpty, selectedAfter).join(',')
    const cityVal = calcCityValue(extraCities, selectedCityValue)

    onChange(reject(isEmpty, cityVal.split(',')).join(','))
  }

  const extraCityOnBlur = () => {
    const selectedCityValue = reject(isEmpty, selected).join(',')
    const cityVal = calcCityValue(extraCities, selectedCityValue)

    onChange(reject(isEmpty, cityVal.split(',')).join(','))
  }

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
            onClick={() => cityOnChange(option)}
          >
            {option.label}
            {NationFlag && <NationFlag $active={active} />}
          </Box>
        )
      })}
      {!showMore && <MoreBtn onClick={() => setShowMore(true)}>更多..</MoreBtn>}
      {showMore && (
        <>
          <InputLabel>或者/以及，其他城市（地区）：</InputLabel>
          <Inputer
            placeholder="多个城市请用 , 分隔开"
            value={extraCities}
            onChange={(e) => setExtraCities(e.target.value)}
            onBlur={() => extraCityOnBlur()}
          />
        </>
      )}
    </Wrapper>
  )
}

export default memo(CitySelector)
