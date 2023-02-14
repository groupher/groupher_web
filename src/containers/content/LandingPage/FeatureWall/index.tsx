import { FC } from 'react'

import UserVoice from './UserVoice'

import ChangelogFeat from './ChangelogFeat'
import DiscussFeat from './DiscussFeat'
import KanbanFeat from './KanbanFeat'
import HelpFeat from './HelpFeat'

import CurlyLineU2D from './CurlyLineDesc/U2D'
import CurlyLineD2K from './CurlyLineDesc/D2K'
import CurlyLineK2C from './CurlyLineDesc/K2C'
import CurlyLineC2H from './CurlyLineDesc/C2H'

import { Wrapper, Slogan, Title, Desc, Wall } from '../styles/feature_wall'

const FeatureWall: FC = () => {
  return (
    <Wrapper>
      <Slogan>
        <Title>为团队和用户之间架设桥梁</Title>
        <Desc>你只需专注产品的核心工作，将那些“无聊”却又重要的体力活交给 Groupher</Desc>
      </Slogan>
      <UserVoice />
      <CurlyLineU2D />
      <Wall>
        <DiscussFeat />
        <CurlyLineD2K />
        <KanbanFeat />
        {/*  {loaded && !isMobile && <CurlyLineK2C />}
        <ChangelogFeat />
        {loaded && !isMobile && <CurlyLineC2H />}
        <HelpFeat /> */}
      </Wall>
    </Wrapper>
  )
}

export default FeatureWall
