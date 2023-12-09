import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'

import type { TCardMetric } from './spec'

import {
  Wrapper,
  Footer,
  DayUpvoteIcon,
  Item,
  DayBar,
  DayTitle,
  DayCodeBox,
  DayCount,
} from '../../styles/feature_wall/dark_mode/day_card'

type TProps = {
  hovering: boolean
  metric: TCardMetric
}

const DayCard: FC<TProps> = ({ hovering, metric }) => {
  return (
    <Wrapper
      $top={hovering ? metric.top[0] : metric.top[1]}
      $left={hovering ? metric.left[0] : metric.left[1]}
      $width={hovering ? metric.width[0] : metric.width[1]}
      $height={hovering ? metric.height[0] : metric.height[1]}
      $zIndex={hovering ? metric.zIndex[0] : metric.zIndex[1]}
      $opacity={hovering ? metric.opacity[0] : metric.opacity[1]}
    >
      <DayTitle>集成 AI 辅助总结</DayTitle>
      <DayCodeBox>
        <Item>
          <DayBar $color={COLOR_NAME.CYAN} width={20} />
          <DayBar $color={COLOR_NAME.PURPLE} width={40} />
        </Item>
        <Item>
          <DayBar $color={COLOR_NAME.ORANGE} width={30} />
          <DayBar $color={COLOR_NAME.BLUE} width={20} />
          <DayBar $color={COLOR_NAME.RED} width={15} />
        </Item>
        <Item>
          <DayBar $color={COLOR_NAME.CYAN} width={20} />
          <DayBar $color={COLOR_NAME.PURPLE} width={40} />
        </Item>
        <Item>
          <DayBar $color={COLOR_NAME.BLUE} width={30} />
          <DayBar $color={COLOR_NAME.PINK} width={20} />
          <DayBar $color={COLOR_NAME.RED} width={10} />
        </Item>
      </DayCodeBox>
      <Footer top={5}>
        <DayUpvoteIcon />
        <DayCount>666</DayCount>
      </Footer>
    </Wrapper>
  )
}

export default DayCard
