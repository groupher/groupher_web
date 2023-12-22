import { FC } from 'react'

import ChartCard from './ChartCard'
import SummaryCard from './SummaryCard'

import { Wrapper } from '../../styles/feature_wall/statistics/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper>
      <SummaryCard hovering={hovering} />
      <ChartCard hovering={hovering} />
    </Wrapper>
  )
}

export default Panel
