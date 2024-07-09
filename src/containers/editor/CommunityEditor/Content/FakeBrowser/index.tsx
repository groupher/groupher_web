import { type FC, memo, useState } from 'react'

import BrowserHead from './BrowerHead'
import Content from './Content'
import MaskPanel from './MaskPanel'

import type { TStep, TCommunityType } from '../../spec'
import { Wrapper } from '../../styles/content/fake_browser'

type TProps = {
  step: TStep
  domain?: string
  title?: string
  desc?: string
  logo?: string | null
  communityType?: TCommunityType
}

const FakeBrowser: FC<TProps> = ({
  step,
  domain = '',
  title = '',
  desc = '',
  logo = null,
  communityType = null,
}) => {
  const [activePath, setActivePath] = useState('')

  return (
    <Wrapper>
      <BrowserHead
        domain={domain}
        title={title}
        desc={desc}
        communityType={communityType}
        activePath={activePath}
      />
      <Content
        title={title}
        desc={desc}
        logo={logo}
        communityType={communityType}
        onHoverThread={setActivePath}
      />
      <MaskPanel step={step} />
    </Wrapper>
  )
}

export default memo(FakeBrowser)
