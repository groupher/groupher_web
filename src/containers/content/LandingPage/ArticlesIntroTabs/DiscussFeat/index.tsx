import { FC } from 'react'

import DiscussDemo from './DiscussDemo'

import IntroDigest from './IntroDigest'

import { Wrapper } from '../../styles/articles_intro_tabs/discuss_feat'

const DiscussFeat: FC = () => {
  return (
    <Wrapper>
      <IntroDigest />
      <DiscussDemo />
    </Wrapper>
  )
}

export default DiscussFeat
