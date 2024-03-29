import { FC } from 'react'

import {
  Wrapper,
  Bar,
  Footer,
  UpvoteIcon,
  Count,
} from '../../../styles/layout/kanban_layout/bg_colors_setter/kanben_item'

type TProps = {
  opacity?: number
  count?: number
  width?: number
}

const KanbanItem: FC<TProps> = ({ opacity = 1, count = 9, width = 80 }) => {
  return (
    <Wrapper opacity={opacity}>
      <Bar top={6} height={3} width={20} opacity={0.5} />
      <Bar top={5} height={4} width={width} bottom={6} opacity={0.8} />

      <Footer>
        <UpvoteIcon />
        <Count>{count}</Count>
        <Bar height={3} width={14} top={3} opacity={0.3} />
      </Footer>
    </Wrapper>
  )
}

export default KanbanItem
