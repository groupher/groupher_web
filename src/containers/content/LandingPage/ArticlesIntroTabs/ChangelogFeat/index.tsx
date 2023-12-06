import { FC } from 'react'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'

import { Wrapper } from '../../styles/articles_intro_tabs/changelog_feat'

const ChangelogFeat: FC = () => {
  return (
    <Wrapper>
      <IntroDigest />
      <IntroImage />
    </Wrapper>
  )
}

export default ChangelogFeat
