import { FC } from 'react'

import type { TActive } from '@/spec'

import type { TFeatType } from '../spec'
import { FEAT } from '../constant'

import { Title, Hint, Desc } from '../styles/feature_wall/feat_head'

type TProps = {
  featType: TFeatType
  title: string
  desc: string
} & TActive

const FeatHead: FC<TProps> = ({ title, desc, featType, $active }) => {
  return (
    <>
      <Title featType={featType}>
        {title} <Hint $active={$active}>{FEAT[featType].HINT}</Hint>
      </Title>
      <Desc>{desc}</Desc>
    </>
  )
}

export default FeatHead
