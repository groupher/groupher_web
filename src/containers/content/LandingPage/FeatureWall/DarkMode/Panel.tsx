import { FC } from 'react'

import DayCard from './DayCard'
import NightCard from './NightCard'

import { Wrapper } from '../../styles/feature_wall/dark_mode/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper>
      <DayCard hovering={hovering} />
      <NightCard hovering={hovering} />
    </Wrapper>
  )
}

export default Panel
