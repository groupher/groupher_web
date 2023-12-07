import { FC } from 'react'

import DirTree from './DirTree'
import Article from './Article'

import { Wrapper } from '../../../styles/articles_intro_tabs/help_feat/help_demo'

const HelpItem: FC = () => {
  return (
    <Wrapper>
      <DirTree />
      <Article />
    </Wrapper>
  )
}

export default HelpItem
