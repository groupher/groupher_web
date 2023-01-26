import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

// import { Br, Divider } from '@/widgets/Common'

// import SectionLabel from '../SectionLabel'

import { Wrapper, Label, Inputer } from '../styles/seo/twitter_graph'

type TProps = {
  testid?: TPostLayout
}

/*
 see: https://mintlify.com/docs/settings/seo for details
*/

const TwitterGraph: FC<TProps> = ({ testid = 'seo' }) => {
  return (
    <Wrapper>
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
