import { FC } from 'react'

import { ICON_BASE } from '@/config'
import { Wrapper, IconWrapper, TeckIcon, Name } from '../styles/tech_stacks/tech_item'

type TProps = {
  path: string
  size?: number
  name: string
}

const TechItem: FC<TProps> = ({ path, size = 40, name }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <TeckIcon src={`${ICON_BASE}/${path}`} size={size} />
      </IconWrapper>
      <Name>{name}</Name>
    </Wrapper>
  )
}

export default TechItem
