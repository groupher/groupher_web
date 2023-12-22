import { FC } from 'react'

import { TActive } from '@/spec'

import DiscussDemo from './DiscussDemo'
import IntroDigest from './IntroDigest'

import { Wrapper } from '../../styles/articles_intro_tabs/discuss_tab'

const DiscussFeat: FC<TActive> = ({ $active }) => {
  return (
    <Wrapper $active={$active}>
      <IntroDigest />
      <DiscussDemo />
    </Wrapper>
  )
}

export default DiscussFeat
