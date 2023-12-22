import { FC } from 'react'

import { DesktopOnly } from '@/widgets/Common'

import IntroItems from './IntroItems'
import {
  Wrapper,
  Digest,
  Highlight,
} from '../../styles/articles_intro_tabs/changelog_tab/intro_digest'

const IntroDigest: FC = () => {
  return (
    <Wrapper>
      <Digest>
        官方团队发布，方便<Highlight>用户</Highlight>快速获取产品
        <Highlight>新功能</Highlight>以及<Highlight>Bug 修复</Highlight>等。
      </Digest>
      <DesktopOnly>
        <IntroItems />
      </DesktopOnly>
    </Wrapper>
  )
}

export default IntroDigest
