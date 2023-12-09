import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import { SpaceGrow } from '@/widgets/Common'

import type { TCardMetric } from './spec'

import {
  Wrapper,
  Footer,
  UpvoteIcon,
  CodeItem,
  Bar,
  Title,
  CodeBox,
  Count,
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
      <Title>集成 AI 辅助总结</Title>
      <CodeBox>
        <CodeItem>
          <Bar $color={COLOR_NAME.CYAN} width={20} />
          <Bar $color={COLOR_NAME.PURPLE} width={40} />
        </CodeItem>
        <CodeItem>
          <Bar $color={COLOR_NAME.ORANGE} width={30} />
          <Bar $color={COLOR_NAME.BLUE} width={20} />
          <Bar $color={COLOR_NAME.RED} width={15} />
        </CodeItem>
        <CodeItem>
          <Bar $color={COLOR_NAME.CYAN} width={20} />
          <Bar $color={COLOR_NAME.PURPLE} width={40} />
        </CodeItem>
        <CodeItem>
          <Bar $color={COLOR_NAME.BLUE} width={30} />
          <Bar $color={COLOR_NAME.PINK} width={20} />
          <Bar $color={COLOR_NAME.RED} width={10} />
        </CodeItem>
      </CodeBox>
      <SpaceGrow />
      <Footer top={16}>
        <UpvoteIcon />
        <Count>666</Count>
      </Footer>
    </Wrapper>
  )
}

export default NightCard
