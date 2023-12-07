import { FC } from 'react'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'

import { Wrapper } from '../../styles/articles_intro_tabs/help_feat'

const KanbanFeat: FC = () => {
  return (
    <Wrapper>
      <IntroDigest />
      <IntroImage />
    </Wrapper>
  )
}

export default KanbanFeat
