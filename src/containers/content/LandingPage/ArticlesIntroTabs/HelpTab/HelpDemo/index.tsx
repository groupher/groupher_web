import { FC } from 'react'

import DirTree from './DirTree'
import Article from './Article'
import InlineComment from './InlineComment'

import { Wrapper } from '../../../styles/articles_intro_tabs/help_tab/help_demo'

const HelpItem: FC = () => {
  return (
    <Wrapper>
      <DirTree />
      <Article />
      <InlineComment />
    </Wrapper>
  )
}

export default HelpItem
