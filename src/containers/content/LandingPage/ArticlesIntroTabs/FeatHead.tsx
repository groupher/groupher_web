import { FC } from 'react'

import type { TActive } from '@/spec'

import type { TFeatType } from '../spec'

import { Wrapper, Desc } from '../styles/articles_intro_tabs/feat_head'

type TProps = {
  featType: TFeatType
  title: string
  desc: string
  alignRight?: boolean
} & TActive

const FeatHead: FC<TProps> = ({ title, desc, featType, $active, alignRight = false }) => {
  return (
    <Wrapper alignRight={alignRight}>
      <Desc alignRight={alignRight}>{desc}</Desc>
    </Wrapper>
  )
}

export default FeatHead
