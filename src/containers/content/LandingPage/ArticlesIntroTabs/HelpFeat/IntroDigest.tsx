import { FC } from 'react'

import IntroItems from './IntroItems'

import {
  Wrapper,
  Digest,
  Hightlight,
} from '../../styles/articles_intro_tabs/help_feat/intro_digest'

const IntroDigest: FC = () => {
  return (
    <Wrapper>
      <Digest>
        沉淀<Hightlight>常见问题</Hightlight>，<Hightlight>公共知识库</Hightlight>以及
        <Hightlight>操作指南</Hightlight>等，快速解决用户疑惑。
      </Digest>

      <IntroItems />
    </Wrapper>
  )
}

export default IntroDigest
