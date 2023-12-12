import { FC } from 'react'

import NodeBlock from './NodeBlock'
import BgShapes from './BgShapes'
import Fans from './Fans'

import {
  Wrapper,
  SeedIcon,
  TadaIcon,
  HeadConnectLine,
  TailConnectLine,
  MainConnectLine,
  PositionWrapper,
} from '../../styles/enjoy_dev/our_way'

const OurWay: FC = () => {
  return (
    <Wrapper>
      <BgShapes />
      <Fans />
      <SeedIcon left="-38px" top="298px" />
      <HeadConnectLine left="-10px" top="306px" />
      <NodeBlock index={0} cat="DEFAULT" />
      <MainConnectLine left="120px" top="306px" />
      <PositionWrapper left="200px" top="20px">
        <NodeBlock cat="FEATURE" />
      </PositionWrapper>
      <PositionWrapper left="210px" top="390px">
        <NodeBlock cat="OTHER" />
      </PositionWrapper>
      <NodeBlock index={1} cat="DEFAULT" />
      <MainConnectLine left="500px" top="306px" />
      <PositionWrapper left="590px" top="40px">
        <NodeBlock cat="QUESTION" />
      </PositionWrapper>
      <PositionWrapper left="600px" top="375px">
        <NodeBlock cat="BUG" />
      </PositionWrapper>
      <NodeBlock index={2} cat="DEFAULT" />
      <TailConnectLine left="965px" top="307px" />
      <TadaIcon left="1028px" top="298px" />
    </Wrapper>
  )
}

export default OurWay
