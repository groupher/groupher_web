import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'
import { Divider } from '@/widgets/Common'

import SectionLabel from '../SectionLabel'
import SearchEnginePreview from './SearchEnginePreview'

import { Wrapper, Label, EnableDesc, Inputer } from '../styles/seo/open_graph'

type TProps = {
  testid?: TPostLayout
}

/*
 see: https://mintlify.com/docs/settings/seo for details
*/

const OpenGraph: FC<TProps> = ({ testid = 'seo' }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="允许搜索引擎收录"
        desc={<EnableDesc>通过启用 robots.txt 使搜索引擎爬虫能够访问你的社区页面</EnableDesc>}
        addon={<ToggleSwitch checked />}
      />
      <Divider bottom={34} top={10} />
      <SearchEnginePreview />
      <SectionLabel title="基本信息" />
      <Label>og:site_name</Label>
      <Inputer />
      <Label>og:title</Label>
      <Inputer />
      <Label>og:description</Label>
      <Inputer />
      <Label>og:url</Label>
      <Inputer />
      <Label>og:image</Label>
      <Inputer />
      <Label>og:locale</Label>
      <Inputer />
      <Label>article:publisher</Label>
      <Inputer />
    </Wrapper>
  )
}

export default memo(OpenGraph)
