import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'

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
}

const NightCard: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper $left={hovering ? 40 : 90} $zIndex={hovering ? 3 : 1} $opacity={hovering ? 1 : 0.9}>
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
      <Footer top={28}>
        <NightUpvoteIcon />
        <NightCount>666</NightCount>
      </Footer>
    </Wrapper>
  )
}

export default NightCard
