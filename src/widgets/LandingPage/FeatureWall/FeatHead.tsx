import { FC } from 'react'

import type { TFeatType } from '../spec'
import { Title, Desc } from '../styles/feature_wall/feat_head'

type TProps = {
  featType: TFeatType
  title: string
  desc: string
}

const FeatHead: FC<TProps> = ({ title, desc, featType }) => {
  return (
    <>
      <Title featType={featType}>{title}</Title>
      <Desc>{desc}</Desc>
    </>
  )
}

export default FeatHead
