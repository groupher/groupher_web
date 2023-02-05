import { FC, useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'

import type { TActive } from '@/spec'

import { FEAT_TYPE } from '../../constant'
import BgDots from '../BgDots'

import {
  Wrapper,
  ImageWrapper,
  Image,
  ColorBlock,
  ColorBlockHolder,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/feature_wall/kanban_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper>
      <BgDots $active={$active} featType={FEAT_TYPE.KANBAN} />
      <ImageWrapper>
        {/* <Image src="/intro/kanban-demo.png" /> */}
        <Image src="https://global-uploads.webflow.com/611a9c161d362bab9bf15fd8/63c17d6a65cb2f9e830e7523_Group%204739.png" />
      </ImageWrapper>

      {!loaded && <ColorBlockHolder />}

      {loaded && (
        <Parallax speed={15} rotate={[-2, 6]} translateY={[10, -10]}>
          <ColorBlock $active={$active} />
        </Parallax>
      )}

      <Parallax speed={15} rotate={[-4, 14]} translateY={[10, -10]} opacity={[1, 0.5]}>
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
