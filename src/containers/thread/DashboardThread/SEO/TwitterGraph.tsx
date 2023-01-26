import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'
import { Br, Divider } from '@/widgets/Common'

import SectionLabel from '../SectionLabel'
import SEOPreview from './SearchEnginePreview'

import { Wrapper, Label, EnableDesc, Inputer } from '../styles/seo/twitter_graph'

type TProps = {
  testid?: TPostLayout
}

/*
 see: https://mintlify.com/docs/settings/seo for details
*/

const TwitterGraph: FC<TProps> = ({ testid = 'seo' }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="允许搜索引擎收录"
        desc={<EnableDesc>通过启用 robots.txt 使搜索引擎爬虫能够访问你的社区页面</EnableDesc>}
      />
      <Divider bottom={34} top={10} />
      <SEOPreview />
      <Br bottom={40} />
      <Label>twitter:title</Label>
      <Inputer />
      <Label>twitter:description</Label>
      <Inputer />
      <Label>twitter:url</Label>
      <Inputer />
      <Label>twitter:site</Label>
      <Inputer />
      <Label>twitter:image</Label>
      <Inputer />
      <Label>og:image:width</Label>
      <Inputer />
      <Label>og:image:height</Label>
      <Inputer />
    </Wrapper>
  )
}

export default memo(TwitterGraph)
