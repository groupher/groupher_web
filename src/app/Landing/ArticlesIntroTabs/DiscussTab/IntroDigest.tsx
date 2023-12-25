import { FC } from 'react'

import IntroItems from './IntroItems'

import {
  Wrapper,
  Digest,
  Highlight,
} from '../../styles/articles_intro_tabs/discuss_tab/intro_digest'

const IntroDigest: FC = () => {
  return (
    <Wrapper>
      <Digest>
        完善的论坛功能，满足<Highlight>用户与团队</Highlight>，
        <Highlight>用户与用户</Highlight>间的互动交流。
      </Digest>

      <IntroItems />
    </Wrapper>
  )
}

export default IntroDigest
