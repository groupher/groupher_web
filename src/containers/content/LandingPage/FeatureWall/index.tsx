import { FC, useState } from 'react'

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
  const [firstFeatInview, setFirstFeatInView] = useState(false)

  return (
    <Wrapper>
      <Slogan>
        <Title>为你的产品添彩</Title>
        <Desc>你只需专注产品的核心工作，将那些“无聊”却又重要的杂活交给 Groupher</Desc>
      </Slogan>
      <UserVoice arrange={firstFeatInview} />
      <CurlyLineU2D />
      <Wall>
        <DiscussFeat inViewOnChange={(inview) => setFirstFeatInView(inview)} />
        <CurlyLineD2K />
        <KanbanFeat />
        <CurlyLineK2C />
        <ChangelogFeat />
        <CurlyLineC2H />
        <HelpFeat />
      </Wall>
    </Wrapper>
  )
}

export default FeatureWall
