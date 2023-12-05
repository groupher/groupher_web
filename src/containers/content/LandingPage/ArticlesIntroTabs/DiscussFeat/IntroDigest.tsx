import { FC } from 'react'

import IntroItems from './IntroItems'

import {
  Wrapper,
  Digest,
  Hightlight,
} from '../../styles/articles_intro_tabs/discuss_feat/intro_digest'

const IntroDigest: FC = () => {
  return (
    <Wrapper>
      <Digest>
        完善简洁的论坛功能，满足<Hightlight>用户与团队</Hightlight>，
        <Hightlight>用户与用户</Hightlight>间的互动交流。
      </Digest>

      <IntroItems />
      {/* <UserCards /> */}
    </Wrapper>
  )
}

export default IntroDigest
