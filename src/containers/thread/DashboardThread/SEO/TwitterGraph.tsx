import { FC, memo } from 'react'

import { Br } from '@/widgets/Common'

import type { TSEOSettings } from '../spec'
import TwitterPreview from './TwitterPreview'
import { Wrapper, Label, Inputer } from '../styles/seo/twitter_graph'
import { edit } from '../logic'

type TProps = {
  settings: TSEOSettings
}

const TwitterGraph: FC<TProps> = ({ settings }) => {
  return (
    <Wrapper>
      <TwitterPreview settings={settings} />
      <Br top={40} />
      <Label>twitter:title</Label>
      <Inputer value={settings.twTitle} onChange={(e) => edit(e, 'twTitle')} />
      <Label>twitter:description</Label>
      <Inputer value={settings.twDescription} onChange={(e) => edit(e, 'twDescription')} />
      <Label>twitter:url</Label>
      <Inputer value={settings.twUrl} onChange={(e) => edit(e, 'twUrl')} />
      <Label>twitter:site</Label>
      <Inputer value={settings.twSite} onChange={(e) => edit(e, 'twSite')} />
      <Label>twitter:card</Label>
      <Inputer value={settings.twCard} onChange={(e) => edit(e, 'twCard')} />
      <Label>twitter:image</Label>
      <Inputer />
    </Wrapper>
  )
}

export default memo(TwitterGraph)
