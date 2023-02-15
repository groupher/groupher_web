import { FC } from 'react'

import type { TActive } from '@/spec'

import type { TFeatType } from '../spec'
import { FEAT } from '../constant'

import { Wrapper, Title, Hint, Desc } from '../styles/feature_wall/feat_head'

type TProps = {
  featType: TFeatType
  title: string
  desc: string
  alignRight?: boolean
} & TActive

const FeatHead: FC<TProps> = ({ title, desc, featType, $active, alignRight = false }) => {
  return (
    <Wrapper alignRight={alignRight}>
      <Title featType={featType}>
        {title} <Hint $active={$active}>{FEAT[featType].HINT}</Hint>
      </Title>
      <Desc alignRight={alignRight}>{desc}</Desc>
    </Wrapper>
  )
}

export default FeatHead
