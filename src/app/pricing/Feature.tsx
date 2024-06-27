import type { FC } from 'react'

import type { TColor } from '~/spec'
import { Wrapper, Title, IconWrapper, CheckIcon } from './styles/feature'

type TProps = {
  title: string
} & TColor

const Feature: FC<TProps> = ({ title, color }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <CheckIcon $color={color} />
      </IconWrapper>
      <Title>{title}</Title>
    </Wrapper>
  )
}

export default Feature
