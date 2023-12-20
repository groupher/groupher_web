import { FC } from 'react'

import IntroItems from './IntroItems'

import { Wrapper, Digest, Highlight } from '../../styles/articles_intro_tabs/help_tab/intro_digest'

const IntroDigest: FC = () => {
  return (
    <Wrapper>
      <Digest>
        沉淀<Highlight>常见问题</Highlight>，<Highlight>公共知识库</Highlight>以及
        <Highlight>操作指南</Highlight>等，快速解决用户疑惑。
      </Digest>

      <IntroItems />
    </Wrapper>
  )
}

export default IntroDigest
