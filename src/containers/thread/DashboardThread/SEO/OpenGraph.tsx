import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import type { TSEOSettings } from '../spec'
import SectionLabel from '../SectionLabel'
import SearchEnginePreview from './SearchEnginePreview'

import { Wrapper, Label, EnableDesc, DetailLink, Inputer } from '../styles/seo/open_graph'
import { edit, toggleSEO } from '../logic'

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
        width="90%"
        desc={
          <EnableDesc>
            请确保你知道该操作的含义，
            <DetailLink href="https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=zh-cn">
              实现原理
            </DetailLink>
          </EnableDesc>
        }
        addon={<ToggleSwitch checked={settings.seoEnable} onChange={(v) => toggleSEO(v)} />}
      />
      {settings.seoEnable && (
        <>
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
          <Inputer value={settings.ogImage} onChange={(e) => edit(e, 'ogImage')} />
        </>
      )}
    </Wrapper>
  )
}

export default memo(OpenGraph)
