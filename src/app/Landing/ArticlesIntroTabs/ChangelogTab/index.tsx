import { FC } from 'react'

import { TActive } from '@/spec'
import IntroDigest from './IntroDigest'
import ChangelogDemo from './ChangelogDemo'

import { Wrapper } from '../../styles/articles_intro_tabs/changelog_tab'

const ChangelogFeat: FC<TActive> = ({ $active }) => {
  return (
    <Wrapper $active={$active}>
      <IntroDigest />
      <ChangelogDemo />
    </Wrapper>
  )
}

export default ChangelogFeat
