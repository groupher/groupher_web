import type { FC } from 'react'

import {
  Wrapper,
  Block,
  Title,
  Num,
  ArrowWrapper,
  ArrowUpIcon,
  ArrowDownIcon,
} from '../../styles/feature_wall/statistics/summary_card'

type TProps = {
  hovering: boolean
}

const SummaryCard: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper left={25} top={80}>
      <Block>
        <Title>访客数</Title>
        <Num>1008</Num>
        {hovering && (
          <ArrowWrapper right={10} bottom={6}>
            <ArrowUpIcon />
          </ArrowWrapper>
        )}
      </Block>

      <Block>
        <Title>访问次数</Title>
        <Num>5016</Num>
        {hovering && (
          <ArrowWrapper right={10} bottom={6}>
            <ArrowUpIcon />
          </ArrowWrapper>
        )}
      </Block>
      <Block>
        <Title>访问时长</Title>
        <Num $opacity={0.8}>05:33</Num>
        {hovering && (
          <ArrowWrapper right={7} bottom={5}>
            <ArrowUpIcon />
          </ArrowWrapper>
        )}
      </Block>
      <Block>
        <Title>跳出率</Title>
        <Num $opacity={0.8}>5.3%</Num>
        {hovering && (
          <ArrowWrapper right={9} bottom={5}>
            <ArrowDownIcon />
          </ArrowWrapper>
        )}
      </Block>
    </Wrapper>
  )
}

export default SummaryCard
