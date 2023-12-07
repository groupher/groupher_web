import { FC } from 'react'

import IntroDigest from './IntroDigest'
import ChangelogDemo from './ChangelogDemo'

import { Wrapper } from '../../styles/articles_intro_tabs/changelog_tab'

const ChangelogFeat: FC = () => {
  return (
    <Wrapper>
      <IntroDigest />
      <ChangelogDemo />
    </Wrapper>
  )
}

export default ChangelogFeat
