import { FC } from 'react'

import Block from './Block'

import { Wrapper, ConnectLine } from '../../styles/enjoy_dev/high_way'

const HighWay: FC = () => {
  return (
    <Wrapper>
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
