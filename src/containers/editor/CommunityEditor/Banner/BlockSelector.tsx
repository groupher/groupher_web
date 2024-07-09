import type { FC } from 'react'

import { find } from 'ramda'

import type { TSelectOption } from '~/spec'

import { Wrapper, Box } from '../styles/banner/block_selector'

type TProps = {
  options: TSelectOption[]
  radius?: number
  onChange: (value: string) => void
  activeValue: string
}

const BlockSelector: FC<TProps> = ({ options, radius = 5, activeValue, onChange }) => {
  const activeOption = find((item) => item.value === activeValue, options)

  return (
    <Wrapper>
      {options.map((option) => (
        <Box
          $active={activeOption?.value === option.value}
          key={option.value}
          radius={radius}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Box>
      ))}
    </Wrapper>
  )
}

export default BlockSelector
