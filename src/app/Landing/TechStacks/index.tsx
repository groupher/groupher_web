import { FC } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

import StackCard from './StackCard'
import GithubCard from './GithubCard'

import { Wrapper, Slogan, Title, Desc, Wall } from '../styles/tech_stacks'

const TeckStacks: FC = () => {
  return (
    <Wrapper>
      <Slogan>
        <Title>源码开放，欢迎共建</Title>
        <Desc>
          现代化的产品体验得益于现代化的技术栈及工具，
          <ArrowButton>了解更多</ArrowButton>
        </Desc>
      </Slogan>
      <Wall>
        <StackCard />
        <GithubCard />
      </Wall>
    </Wrapper>
  )
}

export default TeckStacks
