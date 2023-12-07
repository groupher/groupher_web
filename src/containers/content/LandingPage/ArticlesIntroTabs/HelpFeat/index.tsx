import { FC } from 'react'

import IntroDigest from './IntroDigest'
import HelpDemo from './HelpDemo'

import { Wrapper } from '../../styles/articles_intro_tabs/help_feat'

const KanbanFeat: FC = () => {
  return (
    <Wrapper>
      <IntroDigest />
      <HelpDemo />
    </Wrapper>
  )
}

export default KanbanFeat
