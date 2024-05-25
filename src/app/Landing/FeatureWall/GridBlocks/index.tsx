import { type FC, useState } from 'react'
import { keys, includes } from 'ramda'

import useInterval from '@/hooks/useInterval'
import { SexyDivider } from '@/widgets/Common'

import { BLOCKS, SHINE_DOTS } from './constant'
import Slogan from './Slogan'

import {
  Wrapper,
  InnerWrapper,
  Block,
  Title,
  Desc,
  Line,
  Icon,
} from '../../styles/feature_wall/grid_blocks'

const GridBlocks: FC = () => {
  const [shineIdx, setShineIdx] = useState(0)

  useInterval(() => {
    const nextIdx = shineIdx >= keys(SHINE_DOTS).length - 1 ? 0 : shineIdx + 1
    setShineIdx(nextIdx)
  }, 2000)

  return (
    <Wrapper>
      <Slogan />
      <InnerWrapper>
        <SexyDivider top={0} />
        <Line left={332} top={0} />
        <Line right={332} top={0} />

        <Icon.Square left={325} top={-7} $active={includes('1', SHINE_DOTS[shineIdx])} />
        <Icon.Circle right={325} top={-7} $active={includes('2', SHINE_DOTS[shineIdx])} />
        <Icon.SqaureSrew left={325} top={164} $active={includes('3', SHINE_DOTS[shineIdx])} />
        <Icon.Diamand right={325} top={164} $active={includes('4', SHINE_DOTS[shineIdx])} />
        <Icon.Star right={325} bottom={-6} $active={includes('5', SHINE_DOTS[shineIdx])} />
        <Icon.Triangle left={325} bottom={-6} $active={includes('6', SHINE_DOTS[shineIdx])} />

        {BLOCKS.map((block) => (
          <div key={block.key}>
            {block.key === 4 && <SexyDivider />}
            <Block>
              {block.icon}
              <Title>{block.title}</Title>
              <Desc>{block.desc}</Desc>
            </Block>
          </div>
        ))}

        <SexyDivider bottom={0} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default GridBlocks
