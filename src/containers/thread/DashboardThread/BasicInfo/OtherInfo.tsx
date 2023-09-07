import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import CitySelector from '@/widgets/CitySelector'
import { Br } from '@/widgets/Common'

import type { TBaseInfoSettings } from '../spec'
import { Wrapper, Label, Inputer, Desc } from '../styles/basic_info/other_info'
// import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
}

const OtherInfo: FC<TProps> = ({ testid = 'basic-info', settings }) => {
  return (
    <Wrapper>
      <Label left={-6}>（团队）所在城市</Label>
      <CitySelector onChange={(v) => console.log('## city')} top={15} />

      <Br top={20} />
      <Label>技术栈</Label>
      <Inputer />
      <Desc>团队主要使用的开发或创作工具等，多项请用 , 隔开。</Desc>

      <Br top={22} />
      <Label>媒体报道</Label>
      <Inputer />
      <Desc>请填写相关媒体报道的 URL 链接</Desc>
    </Wrapper>
  )
}

export default memo(OtherInfo)
