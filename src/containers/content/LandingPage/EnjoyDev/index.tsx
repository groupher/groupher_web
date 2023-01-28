import { FC } from 'react'
// import { Parallax } from 'react-scroll-parallax'

import { Br } from '@/widgets/Common'
// import TechItem from './TechItem'
import Block from './Block'
import NodeBlock from './NodeBlock'

import {
  Wrapper,
  Slogan,
  Title,
  Desc,
  Wall,
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
        <Desc>让你心爱的产品尽早接受真实用户的反馈，优先满足用户真正关心的需求</Desc>
      </Slogan>
      <Wall>
        <BadWrapper>
          <Block text="开发" />
          <Block text="开发" />
          <Block text="开发" />
          <Block text="开发" />
          <Block text="开发" />
          <Block text="没人用" />
          <Block text="放弃" />
        </BadWrapper>
        <NoNote>
          <NoIcon />
          团队两行泪
        </NoNote>
        <VS>VS</VS>
        <GoodWrapper>
          <NodeBlock index={0} />
          <PositionWrapper left="200px" top="20px">
            <NodeBlock cat="FEATURE" />
          </PositionWrapper>
          <PositionWrapper left="210px" top="350px">
            <NodeBlock cat="OTHER" />
          </PositionWrapper>
          <NodeBlock index={1} />
          <PositionWrapper left="590px" top="40px">
            <NodeBlock cat="BUG" />
          </PositionWrapper>
          <PositionWrapper left="600px" top="340px">
            <NodeBlock cat="QUESTION" />
          </PositionWrapper>
          <NodeBlock index={2} />
          {/* <Block text="双赢" /> */}
          {/* <Parallax speed={-10} translateY={[10, -10]} opacity={[1, 0.8]}> */}
          <BgWrapper />
          {/* </Parallax> */}
        </GoodWrapper>
        {/* <BgWrapper>
          <Parallax speed={-10} translateY={[10, -10]} opacity={[1, 0.8]}>
            <CADBackground src="/cad-bg.png" />
          </Parallax>
        </BgWrapper> */}
      </Wall>

      <Br top={40} />
      <YesNote>
        <YesIcon />
        与用户共赢
      </YesNote>
    </Wrapper>
  )
}

export default EnjoyDev
