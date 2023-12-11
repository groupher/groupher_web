import { FC } from 'react'

import { num2Percent } from '@/helper'
import { SpaceGrow } from '@/widgets/Common'

import { PRODUCTS, MAX_SIZE } from './constant'

import {
  Wrapper,
  Item,
  Header,
  IconWrapper,
  Icon,
  Title,
  LoadingIcon,
  Size,
  BarTrack,
  Bar,
} from '../../styles/feature_wall/bundle_size_card/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper>
      {PRODUCTS.map((item, index) => {
        const $good = index === 0
        const $suck = index > 3

        return (
          <Item key={item.title} $opacity={item.opacity}>
            <Header>
              <IconWrapper>
                <Icon src={item.icon} $size={item.iconSize || 11} />
              </IconWrapper>
              <Title $good={$good}>{item.title}</Title>
              {hovering && index > 3 && <LoadingIcon />}
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
