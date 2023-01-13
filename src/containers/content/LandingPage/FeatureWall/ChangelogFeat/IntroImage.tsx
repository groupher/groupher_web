import { FC } from 'react'
import { Parallax } from 'react-scroll-parallax'

import type { TActive } from '@/spec'

import { FEAT_TYPE } from '../../constant'
import BgDots from '../BgDots'

import {
  Wrapper,
  ImageWrapper,
  Image,
  ColorBlock,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/feature_wall/changelog_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper>
      <BgDots $active={$active} featType={FEAT_TYPE.DISCUSS} />
      <ImageWrapper>
        <Image src="/intro-help-demo.png" />
      </ImageWrapper>

      <Parallax speed={15} rotate={[-5, 8]} translateY={[10, -10]}>
        <ColorBlock $active={$active} />
      </Parallax>

      <Parallax speed={15} rotate={[-4, 14]} translateY={[10, -10]} opacity={[1, 0.3]}>
        <IconsWrapper>
          <Icon1 />
          <Icon2 />
          <Icon3 />
        </IconsWrapper>
      </Parallax>
    </Wrapper>
  )
}

export default IntroImage
