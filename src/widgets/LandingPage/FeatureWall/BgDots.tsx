import { FC } from 'react'

import type { TActive } from '@/spec'

import type { TFeatType } from '../spec'
import { Wrapper } from '../styles/feature_wall/bg_dots'

type TProps = {
  featType: TFeatType
} & TActive

const BgDots: FC<TProps> = ({ featType, $active }) => {
  return <Wrapper $active={$active} featType={featType} />
}

export default BgDots
