import { FC } from 'react'

import { Wrapper, Title, IconWrapper, CheckIcon } from './styles/feature'

type TProps = {
  title: string
}

const Feature: FC<TProps> = ({ title }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <CheckIcon />
      </IconWrapper>
      <Title>{title}</Title>
    </Wrapper>
  )
}

export default Feature
