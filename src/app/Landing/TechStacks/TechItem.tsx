import { FC } from 'react'

import { Wrapper, IconWrapper, A4Paper, TeckIcon, Name } from '../styles/tech_stacks/tech_item'

type TProps = {
  path: string
  size?: number
  name: string
}

const TechItem: FC<TProps> = ({ path, size = 40, name }) => {
  if (name === 'Paper') {
    return (
      <Wrapper>
        <A4Paper src="landing/stacks/a4.png" />
        <Name>{name}</Name>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <IconWrapper>
        <TeckIcon src={`landing/stacks/${path}`} size={size} />
      </IconWrapper>
      <Name>{name}</Name>
    </Wrapper>
  )
}

export default TechItem
