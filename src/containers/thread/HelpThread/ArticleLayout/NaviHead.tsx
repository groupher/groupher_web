import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'

import HeadAction from './HeadAction'

import { Wrapper, Home, ArrowIcon, Slash, Cur } from '../styles/article_layout/navi_head'
import { back2Layout } from '../logic'

const NaviHead: FC = () => {
  return (
    <Wrapper>
      <Home onClick={() => back2Layout()}>
        <ArrowIcon />
        全部
      </Home>
      <Slash>/</Slash>
      <Cur>产品</Cur>
      <SpaceGrow />
      <HeadAction />
    </Wrapper>
  )
}

export default NaviHead
