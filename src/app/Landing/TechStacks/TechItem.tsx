import type { FC } from 'react'

import { Wrapper, IconWrapper, TeckIcon, NotesIcon, Name } from '../styles/tech_stacks/tech_item'

type TProps = {
  path: string
  size?: number
  name: string
}

const TechItem: FC<TProps> = ({ path, size = 40, name }) => {
  return (
    <Wrapper>
      <IconWrapper>
        {name === 'Notes' ? (
          <NotesIcon src={`landing/stacks/${path}`} size={size} />
        ) : (
          <TeckIcon src={`landing/stacks/${path}`} size={size} />
        )}
      </IconWrapper>
      <Name>{name}</Name>
    </Wrapper>
  )
}

export default TechItem
