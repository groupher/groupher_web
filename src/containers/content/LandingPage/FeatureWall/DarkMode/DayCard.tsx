import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'

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
}

const DayCard: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper $left={hovering ? 120 : 15} $zIndex={hovering ? 1 : 3}>
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
