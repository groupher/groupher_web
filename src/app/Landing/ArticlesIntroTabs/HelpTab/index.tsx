import { FC } from 'react'

import type { TActive } from '@/spec'

import IntroDigest from './IntroDigest'
import HelpDemo from './HelpDemo'

import { Wrapper } from '../../styles/articles_intro_tabs/help_tab'

const HelpFeat: FC<TActive> = ({ $active }) => {
  return (
    <Wrapper $active={$active}>
      <IntroDigest />
      <HelpDemo />
    </Wrapper>
  )
}

export default HelpFeat
