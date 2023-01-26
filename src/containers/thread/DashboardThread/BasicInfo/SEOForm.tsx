import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'
import { Br, Divider } from '@/widgets/Common'

import SectionLabel from '../SectionLabel'
import SEOPreview from './SEOPreview'

import { Wrapper, Label, EnableDesc, Inputer } from '../styles/basic_info/seo'

type TProps = {
  testid?: TPostLayout
}

/*
 see: https://mintlify.com/docs/settings/seo for details
*/

const SEO: FC<TProps> = ({ testid = 'seo' }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="允许搜索引擎收录"
        desc={<EnableDesc>通过启用 robots.txt 使搜索引擎爬虫能够访问你的社区页面</EnableDesc>}
        addon={<ToggleSwitch checked />}
      />
      <Divider bottom={34} top={10} />
      <SEOPreview />
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

      <Br bottom={40} />
      <SectionLabel title="twitter" />
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

export default memo(SEO)
