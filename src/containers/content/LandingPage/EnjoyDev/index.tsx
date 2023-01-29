import { FC } from 'react'

import { Br } from '@/widgets/Common'
import Block from './Block'
import NodeBlock from './NodeBlock'

import BgShapes from './BgShapes'

import {
  Wrapper,
  Slogan,
  Title,
  Desc,
  Wall,
  ConnectLine,
  SeedIcon,
  TadaIcon,
  HeadConnectLine,
  TailConnectLine,
  MainConnectLine,
  BgWrapper,
  BadWrapper,
  GoodWrapper,
  PositionWrapper,
  VS,
  YesNote,
  NoNote,
  YesIcon,
  NoIcon,
} from '../styles/enjoy_dev'

const EnjoyDev: FC = () => {
  return (
    <Wrapper>
      <Slogan>
        <Title>将用户反馈融入开发流程</Title>
        <Desc>让你心爱的产品尽早收集真实用户的反馈，优先满足用户真正关心的需求</Desc>
      </Slogan>
      <Wall>
        <BadWrapper>
          <Block text="开发" noDot />
          <ConnectLine />
          <Block text="开发" />
          <ConnectLine />
          <Block text="开发" />
          <ConnectLine />
          <Block text="开发" />
          <ConnectLine />
          <Block text="开发" />
          <ConnectLine />
          <Block text="没人用" type="online" />
          <ConnectLine />
          <Block text="放弃" type="giveup" />
        </BadWrapper>
        <NoNote>
          <NoIcon />
          团队两行泪
        </NoNote>
        <VS>VS</VS>
        <GoodWrapper>
          <BgShapes />
          <SeedIcon left="-38px" top="298px" />
          <HeadConnectLine left="-10px" top="306px" />
          <NodeBlock index={0} />
          <MainConnectLine left="120px" top="306px" />
          <PositionWrapper left="200px" top="20px">
            <NodeBlock cat="FEATURE" />
          </PositionWrapper>
          <PositionWrapper left="210px" top="390px">
            <NodeBlock cat="OTHER" />
          </PositionWrapper>
          <NodeBlock index={1} />
          <MainConnectLine left="500px" top="306px" />
          <PositionWrapper left="590px" top="40px">
            <NodeBlock cat="QUESTION" />
          </PositionWrapper>
          <PositionWrapper left="600px" top="375px">
            <NodeBlock cat="BUG" />
          </PositionWrapper>
          <NodeBlock index={2} />
          <TailConnectLine left="965px" top="307px" />
          <TadaIcon left="1028px" top="300px" />
        </GoodWrapper>

        <YesNote>
          <YesIcon />
          与用户共赢
        </YesNote>
        <BgWrapper />
      </Wall>

      <Br top={40} />
    </Wrapper>
  )
}

export default EnjoyDev
