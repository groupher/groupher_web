import { FC } from 'react'

import { num2Percent } from '@/helper'
import { SpaceGrow } from '@/widgets/Common'

import { PRODUCTS, MAX_SIZE } from './constant'

import {
  Wrapper,
  Item,
  Header,
  Title,
  Size,
  BarTrack,
  Bar,
} from '../../styles/feature_wall/bundle_size_card/panel'

const Panel: FC = () => {
  return (
    <Wrapper>
      {PRODUCTS.map((item, index) => {
        const $good = index === 0
        const $suck = index > 3

        return (
          <Item key={item.title}>
            <Header>
              <Title $good={$good}>{item.title}</Title>
              <SpaceGrow />
              <Size $good={$good} $suck={$suck}>
                {item.size}
              </Size>
            </Header>
            <BarTrack>
              <Bar width={num2Percent(item.sizeNum / MAX_SIZE)} $good={$good} $suck={$suck} />
            </BarTrack>
          </Item>
        )
      })}
    </Wrapper>
  )
}

export default Panel
