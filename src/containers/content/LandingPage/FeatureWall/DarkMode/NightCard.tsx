import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import { SpaceGrow } from '@/widgets/Common'

import type { TCardMetric } from './spec'

import {
  Wrapper,
  Footer,
  NightUpvoteIcon,
  Item,
  NightBar,
  NightTitle,
  NightCodeBox,
  NightCount,
} from '../../styles/feature_wall/dark_mode/night_card'

type TProps = {
  hovering: boolean
  metric: TCardMetric
}

const NightCard: FC<TProps> = ({ hovering, metric }) => {
  return (
    <Wrapper
      $top={hovering ? metric.top[0] : metric.top[1]}
      $left={hovering ? metric.left[0] : metric.left[1]}
      $width={hovering ? metric.width[0] : metric.width[1]}
      $height={hovering ? metric.height[0] : metric.height[1]}
      $zIndex={hovering ? metric.zIndex[0] : metric.zIndex[1]}
      $opacity={hovering ? metric.opacity[0] : metric.opacity[1]}
    >
      <NightTitle>集成 AI 辅助总结</NightTitle>
      <NightCodeBox>
        <Item>
          <NightBar $color={COLOR_NAME.CYAN} width={20} />
          <NightBar $color={COLOR_NAME.PURPLE} width={40} />
        </Item>
        <Item>
          <NightBar $color={COLOR_NAME.ORANGE} width={30} />
          <NightBar $color={COLOR_NAME.BLUE} width={20} />
          <NightBar $color={COLOR_NAME.RED} width={15} />
        </Item>
        <Item>
          <NightBar $color={COLOR_NAME.CYAN} width={20} />
          <NightBar $color={COLOR_NAME.PURPLE} width={40} />
        </Item>
        <Item>
          <NightBar $color={COLOR_NAME.BLUE} width={30} />
          <NightBar $color={COLOR_NAME.PINK} width={20} />
          <NightBar $color={COLOR_NAME.RED} width={10} />
        </Item>
      </NightCodeBox>
      <SpaceGrow />
      <Footer>
        <NightUpvoteIcon />
        <NightCount>666</NightCount>
      </Footer>
    </Wrapper>
  )
}

export default NightCard
