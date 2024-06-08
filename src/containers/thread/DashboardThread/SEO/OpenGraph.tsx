import { type FC, memo } from 'react'

import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import SectionLabel from '../SectionLabel'
import SearchEnginePreview from './SearchEnginePreview'

import useSEOInfo from '../hooks/useSEOInfo'
import { Wrapper, Label, EnableDesc, DetailLink, Inputer } from '../styles/seo/open_graph'
import { edit, toggleSEO } from '../logic'

/*
 see: https://mintlify.com/docs/settings/seo for details
*/

const OpenGraph: FC = () => {
  const { seoEnable, ogSiteName, ogTitle, ogDescription, ogImage, ogUrl } = useSEOInfo()

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
        addon={<ToggleSwitch checked={seoEnable} onChange={(v) => toggleSEO(v)} />}
      />
      {seoEnable && (
        <>
          <SearchEnginePreview />
          <Label>og:site_name</Label>
          <Inputer value={ogSiteName} onChange={(e) => edit(e, 'ogSiteName')} />
          <Label>og:title</Label>
          <Inputer value={ogTitle} onChange={(e) => edit(e, 'ogTitle')} />
          <Label>og:description</Label>
          <Inputer value={ogDescription} onChange={(e) => edit(e, 'ogDescription')} />
          <Label>og:url</Label>
          <Inputer value={ogUrl} onChange={(e) => edit(e, 'ogUrl')} />
          <Label>og:image</Label>
          <Inputer value={ogImage} onChange={(e) => edit(e, 'ogImage')} />
        </>
      )}
    </Wrapper>
  )
}

export default memo(OpenGraph)
