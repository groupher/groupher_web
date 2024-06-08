import { type FC, memo } from 'react'

import { HCN } from '@/const/name'
import { changeToCommunity } from '@/signal'

import { Wrapper, Logo, Block, Title } from '../styles/global_menu/home_navi'

const HomeNavi: FC = () => {
  return (
    <Wrapper onClick={() => changeToCommunity(HCN)}>
      <Logo />
      <Block>
        <Title>首页</Title>
      </Block>
    </Wrapper>
  )
}

export default memo(HomeNavi)
