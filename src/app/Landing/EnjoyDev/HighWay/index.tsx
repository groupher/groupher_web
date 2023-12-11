import { FC } from 'react'

import Block from './Block'

import { Wrapper, DashLine, SeedIcon, ConnectLine } from '../../styles/enjoy_dev/high_way'

const HighWay: FC = () => {
  return (
    <Wrapper>
      <SeedIcon left="100px" top="60px" />
      <DashLine />
      <Block text="开发" noDot />
      <ConnectLine />
      <Block text="开发" />
      <ConnectLine />
      <Block text="开发" />
      <ConnectLine />
      <Block text="开发" />
      <ConnectLine />
      <Block text="上线没人用" type="online" />
      <ConnectLine />
      <Block text="放弃" type="giveup" />
    </Wrapper>
  )
}

export default HighWay
