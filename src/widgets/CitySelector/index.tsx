/*
 *
 * CitySelector
 *
 */

import { FC, memo, useCallback, useEffect, useState } from 'react'
import { find, includes, without, reject, isEmpty } from 'ramda'

import type { TCityOption } from '@/spec'
import { CITY_OPTIONS } from '@/constant/city'
import { buildLog } from '@/utils/logger'

import { Wrapper, Box, Flag } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:CitySelector:index')

type TProps = {
  radius?: number
  value?: string
  options?: TCityOption[]
  onChange: (value: string) => void
}

const CitySelector: FC<TProps> = ({ radius = 5, value = '', onChange, options = CITY_OPTIONS }) => {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setSelected(value.split(','))
  }, [value])

  const onValueChange = useCallback(() => {
    onChange(reject(isEmpty, selected).join(','))
  }, [selected, onChange])

  return (
    <Wrapper>
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
                // @ts-ignore
                setSelected([...selected, option.value], () => onValueChange())
              } else {
                // @ts-ignore
                setSelected(without([option.value], selected), () => onValueChange())
              }
            }}
          >
            {option.label}
            {NationFlag && <NationFlag $active={active} />}
          </Box>
        )
      })}
    </Wrapper>
  )
}

export default memo(CitySelector)
