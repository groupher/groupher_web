import type { FC } from 'react'

import AnimatedCount from '@/widgets/AnimatedCount'

import {
  Wrapper,
  TrendText,
  TrendNum,
  ChartBottomGradient,
  Column,
  HighlightColumn,
  HighlightDot,
} from '../../styles/feature_wall/statistics/chart_card'

type TProps = {
  hovering: boolean
}

const ChartCard: FC<TProps> = ({ hovering }) => {
  return (
    <>
      <Column top={45} right={50} height="120px" />
      <Column top={56} left={170} height="100px" />
      {!hovering && <Column top={45} right={75} height="120px" />}
      {hovering && <Column top={45} right={100} height="120px" />}

      <HighlightColumn top={45} right={hovering ? 75 : 100} height="122px" />
      <HighlightDot top={hovering ? 67 : 103} right={hovering ? 69 : 95} />

      <Wrapper top={20} right={30}>
        <TrendText top={11} left={12}>
          实时访客
        </TrendText>

        <TrendNum top={30} left={13}>
          <AnimatedCount count={hovering ? 99 : 26} forceColor="#323232" size="large" />
        </TrendNum>
        <ChartBottomGradient />
      </Wrapper>
    </>
  )
}

export default ChartCard
