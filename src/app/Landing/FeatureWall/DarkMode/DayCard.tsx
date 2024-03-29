import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'

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
} from '../../styles/feature_wall/dark_mode/day_card'

type TProps = {
  hovering: boolean
  metric: TCardMetric
}

const DayCard: FC<TProps> = ({ hovering, metric }) => {
  return (
    <Wrapper
      $hovering={hovering}
      $width={hovering ? metric.width[0] : metric.width[1]}
      $height={hovering ? metric.height[0] : metric.height[1]}
    >
      <Title $hovering={hovering}>集成 AI 辅助总结</Title>
      <CodeBox $hovering={hovering}>
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
      <Footer top={16}>
        <UpvoteIcon $hovering={hovering} />
        <Count $hovering={hovering}>666</Count>
      </Footer>
    </Wrapper>
  )
}

export default DayCard
