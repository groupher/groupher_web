import { FC } from 'react'

import ChangelogFeat from './ChangelogFeat'
import DiscussFeat from './DiscussFeat'
import KanbanFeat from './KanbanFeat'
import HelpFeat from './HelpFeat'

import { Wrapper, Slogan, Title, Desc, Wall } from '../styles/feature_wall'

const FeatureWall: FC = () => {
  return (
    <Wrapper>
      <Slogan>
        <Title>为你的产品添彩</Title>
        <Desc>你只需专注产品的核心工作，将那些“无聊”却又重要的体力活交给 Groupher</Desc>
      </Slogan>
      <Wall>
        <DiscussFeat />
        <KanbanFeat />
        <ChangelogFeat />
        <HelpFeat />
      </Wall>
    </Wrapper>
  )
}

export default FeatureWall
