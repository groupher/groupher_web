import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'
import { Divider } from '@/widgets/Common'

import type { TSEOSettings } from '../spec'
import SectionLabel from '../SectionLabel'
import SearchEnginePreview from './SearchEnginePreview'

import { Wrapper, Label, EnableDesc, Inputer } from '../styles/seo/open_graph'
import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TSEOSettings
}

/*
 see: https://mintlify.com/docs/settings/seo for details
*/

const OpenGraph: FC<TProps> = ({ testid = 'seo', settings }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="允许搜索引擎收录"
        desc={<EnableDesc>通过启用 robots.txt 使搜索引擎爬虫能够访问你的社区页面</EnableDesc>}
        addon={<ToggleSwitch checked />}
      />
      <Divider bottom={34} top={10} />
      <SearchEnginePreview settings={settings} />
      <Label>og:site_name</Label>
      <Inputer value={settings.ogSiteName} onChange={(e) => edit(e, 'ogSiteName')} />
      <Label>og:title</Label>
      <Inputer value={settings.ogTitle} onChange={(e) => edit(e, 'ogTitle')} />
      <Label>og:description</Label>
      <Inputer value={settings.ogDescription} onChange={(e) => edit(e, 'ogDescription')} />
      <Label>og:url</Label>
      <Inputer value={settings.ogUrl} onChange={(e) => edit(e, 'ogUrl')} />
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
