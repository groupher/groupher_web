import { FC, memo } from 'react'

import type { TSelectOption } from '@/spec'
import { Br } from '@/widgets/Common'
import Select from '@/widgets/Select'

import type { TSEOSettings } from '../spec'
import { TW_CARD_OPTIONS } from '../constant'

import TwitterPreview from './TwitterPreview'
import { Wrapper, SelectWrapper, Label, Inputer } from '../styles/seo/twitter_graph'
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
      {/* <Inputer value={settings.twCard} onChange={(e) => edit(e, 'twCard')} /> */}
      <SelectWrapper>
        <Select
          value={{ label: settings.twCard, value: settings.twCard }}
          options={TW_CARD_OPTIONS}
          placeholder="请选择标签所在分组"
          onChange={(option: TSelectOption) => edit(option.value, 'twCard')}
        />
      </SelectWrapper>

      <Label>twitter:image</Label>
      <Inputer />
    </Wrapper>
  )
}

export default memo(TwitterGraph)
