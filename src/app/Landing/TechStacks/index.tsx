import { FC } from 'react'

import StackCard from './StackCard'
import GithubCard from './GithubCard'

import { Wrapper, Slogan, Title, Desc, Wall } from '../styles/tech_stacks'

const TeckStacks: FC = () => {
  return (
    <Wrapper>
      <Slogan>
        <Title>源码开放，诚邀共建</Title>
        <Desc>由开源技术栈驱动，开放透明，期待您的共同参与</Desc>
      </Slogan>
      <Wall>
        <StackCard />
        <GithubCard />
      </Wall>
    </Wrapper>
  )
}

export default TeckStacks
