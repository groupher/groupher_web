import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import type { TBaseInfoSettings } from '../spec'
import { Wrapper, Label, Inputer } from '../styles/basic_info/other_info'
// import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
}

const OtherInfo: FC<TProps> = ({ testid = 'basic-info', settings }) => {
  return (
    <Wrapper>
      <Label>城市</Label>
      <Inputer />
      <Label>技术栈</Label>
      <Inputer />
      <Label>媒体报道</Label>
      <Inputer />
    </Wrapper>
  )
}

export default memo(OtherInfo)
