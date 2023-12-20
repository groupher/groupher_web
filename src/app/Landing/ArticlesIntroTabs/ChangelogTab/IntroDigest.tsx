import { FC } from 'react'

import { DesktopOnly } from '@/widgets/Common'

import IntroItems from './IntroItems'
import {
  Wrapper,
  Digest,
  Hightlight,
} from '../../styles/articles_intro_tabs/changelog_tab/intro_digest'

const IntroDigest: FC = () => {
  return (
    <Wrapper>
      <Digest>
        官方团队发布，方便<Hightlight>用户</Hightlight>快速获取产品
        <Hightlight>新功能</Hightlight>以及<Hightlight>Bug 修复</Hightlight>等。
      </Digest>
      <DesktopOnly>
        <IntroItems />
      </DesktopOnly>
    </Wrapper>
  )
}

export default IntroDigest
