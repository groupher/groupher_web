import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import SocialEditor from '@/widgets/SocialEditor'

import type { TBaseInfoSettings } from '../spec'

import { Wrapper } from '../styles/basic_info/base_info'
// import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
}

const SocialInfo: FC<TProps> = ({ testid = 'basic-info', settings }) => {
  return (
    <Wrapper>
      <SocialEditor />
    </Wrapper>
  )
}

export default memo(SocialInfo)
