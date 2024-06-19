import type { FC } from 'react'
import { isEmpty } from 'ramda'

import { INIT_KANBAN_COLORS } from '@/const/dashboard'
import { Brick } from '@/widgets/Common'

import useKanban from '../../../logic/useKanban'
import {
  Wrapper,
  Header,
  Content,
} from '../../../styles/layout/kanban_layout/bg_colors_setter/waterfall_layout'

type TProps = {
  isBoard1Hovered: boolean
  isBoard2Hovered: boolean
  isBoard3Hovered: boolean
}

const WaterfallLayout: FC<TProps> = ({ isBoard1Hovered, isBoard2Hovered, isBoard3Hovered }) => {
  const { kanbanBgColors } = useKanban()
  const [BG1, BG2, BG3] = isEmpty(kanbanBgColors) ? INIT_KANBAN_COLORS : kanbanBgColors

  return (
    <Wrapper>
      <Header $color={BG1} $active={isBoard1Hovered} />
      <Content $height="110px">
        <Brick $width={350} $height={6} $opacity={0.2} top={20} left={6} />
        <Brick $width={50} $height={6} $opacity={0.12} top={20} right={10} />
        <Brick $width={35} $height={6} $opacity={0.08} top={20} right={70} />

        <Brick $width={380} $height={6} $opacity={0.2} top={45} left={6} />
        <Brick $width={50} $height={6} $opacity={0.12} top={45} right={10} />
        <Brick $width={35} $height={6} $opacity={0.08} top={45} right={70} />

        <Brick $width={250} $height={6} $opacity={0.1} top={68} left={6} />
        <Brick $width={50} $height={6} $opacity={0.08} top={68} right={10} />
        <Brick $width={35} $height={6} $opacity={0.05} top={68} right={70} />
      </Content>
      <Header $color={BG2} $active={isBoard2Hovered} />
      <Content $height="90px">
        <Brick $width={350} $height={6} $opacity={0.2} top={20} left={6} />
        <Brick $width={50} $height={6} $opacity={0.12} top={20} right={10} />
        <Brick $width={35} $height={6} $opacity={0.08} top={20} right={70} />

        <Brick $width={250} $height={6} $opacity={0.1} top={46} left={6} />
        <Brick $width={50} $height={6} $opacity={0.08} top={46} right={10} />
        <Brick $width={35} $height={6} $opacity={0.05} top={46} right={70} />
      </Content>
      <Header $color={BG3} $active={isBoard3Hovered} />
      <Content $height="90px">
        <Brick $width={350} $height={6} $opacity={0.2} top={20} left={6} />
        <Brick $width={50} $height={6} $opacity={0.12} top={20} right={10} />
        <Brick $width={35} $height={6} $opacity={0.08} top={20} right={70} />

        <Brick $width={250} $height={6} $opacity={0.1} top={46} left={6} />
        <Brick $width={50} $height={6} $opacity={0.08} top={46} right={10} />
        <Brick $width={35} $height={6} $opacity={0.05} top={46} right={70} />
      </Content>
    </Wrapper>
  )
}

export default WaterfallLayout
