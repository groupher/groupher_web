import { FC, useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'

import type { TActive } from '@/spec'

import { FEAT_TYPE } from '../../constant'
import BgDots from '../BgDots'

import DiscussDemo from './DiscussDemo'

import {
  Wrapper,
  ImageWrapper,
  ColorBlock,
  ColorBlockHolder,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/feature_wall/discuss_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper>
      <BgDots $active={$active} featType={FEAT_TYPE.DISCUSS} />
      <ImageWrapper>
        <DiscussDemo />
      </ImageWrapper>

      {!loaded && <ColorBlockHolder />}

      {loaded && (
        <Parallax speed={15} rotate={[-2, 10]} translateY={[10, -10]}>
          <ColorBlock $active={$active} />
        </Parallax>
      )}

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
