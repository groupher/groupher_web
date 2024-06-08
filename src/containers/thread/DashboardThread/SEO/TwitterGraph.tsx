import { type FC, memo } from 'react'

import type { TSelectOption } from '@/spec'
import { Br } from '@/widgets/Common'
import Select from '@/widgets/Select'

import { TW_CARD_OPTIONS } from '../constant'

import TwitterPreview from './TwitterPreview'
import useSEOInfo from '../hooks/useSEOInfo'
import { Wrapper, SelectWrapper, Label, Inputer } from '../styles/seo/twitter_graph'
import { edit } from '../logic'

const TwitterGraph: FC = () => {
  const { twTitle, twDescription, twUrl, twSite, twCard } = useSEOInfo()

  return (
    <Wrapper>
      <TwitterPreview />
      <Br top={40} />
      <Label>twitter:title</Label>
      <Inputer value={twTitle} onChange={(e) => edit(e, 'twTitle')} />
      <Label>twitter:description</Label>
      <Inputer value={twDescription} onChange={(e) => edit(e, 'twDescription')} />
      <Label>twitter:url</Label>
      <Inputer value={twUrl} onChange={(e) => edit(e, 'twUrl')} />
      <Label>twitter:site</Label>
      <Inputer value={twSite} onChange={(e) => edit(e, 'twSite')} />
      <Label>twitter:card</Label>
      {/* <Inputer value={twCard} onChange={(e) => edit(e, 'twCard')} /> */}
      <SelectWrapper>
        <Select
          value={{ label: twCard, value: twCard }}
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
