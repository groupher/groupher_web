import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import { Br } from '@/widgets/Common'

import Portal from '../Portal'
import SectionLabel from '../SectionLabel'
// import CheckLabel from '@/widgets/CheckLabel'

import { Wrapper, Section, Label, Inputer } from '../styles/seo'

type TProps = {
  testid?: TPostLayout
}

/*
 see: https://mintlify.com/docs/settings/seo for details
*/

const SEO: FC<TProps> = ({ testid = 'seo' }) => {
  return (
    <Wrapper>
      <Portal title="社区 SEO" desc="社区 SEO 相关信息。" />
      <Section>
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
      </Section>
    </Wrapper>
  )
}

export default memo(SEO)
