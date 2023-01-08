import { FC } from 'react'

import type { TActive } from '@/spec'

import { FEAT_TYPE } from '../../constant'
import BgDots from '../BgDots'

import { Wrapper, Image, ColorBlock } from '../../styles/feature_wall/discuss_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper>
      <BgDots $active={$active} featType={FEAT_TYPE.DISCUSS} />
      <Image src="/intro-help-demo.png" />
      <ColorBlock $active={$active} />
    </Wrapper>
  )
}

export default IntroImage
