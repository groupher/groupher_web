import type { FC } from 'react'

import { Wrapper, Bar } from '../../styles/feature_wall/grid_blocks/status_bars'

const StatusBars: FC = () => {
  return (
    <Wrapper>
      <Bar />
      <Bar />
      <Bar />
      <Bar />
      <Bar />
    </Wrapper>
  )
}

export default StatusBars
